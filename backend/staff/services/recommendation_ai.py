import json
import os
from urllib import error as urlerror
from urllib import request as urlrequest


def _to_bool(value):
    return str(value).strip().lower() in {"1", "true", "yes", "on"}


def _safe_int(value, default):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _safe_float(value, default):
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _extract_text_response(data):
    try:
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError, TypeError):
        return ""


def _parse_json_text(raw_text):
    if not raw_text:
        return None

    cleaned = raw_text.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.strip("`")
        cleaned = cleaned.replace("json", "", 1).strip()
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        return None


def _normalize_reason_list(value):
    if not isinstance(value, list):
        return []
    normalized = []
    for item in value[:4]:
        if isinstance(item, str):
            text = item.strip()
            if text:
                normalized.append(text[:180])
    return normalized


def _normalize_confidence(value):
    normalized = str(value or "").upper().strip()
    if normalized in {"LOW", "MEDIUM", "HIGH"}:
        return normalized
    return "MEDIUM"


def synthesize_short_reason_from_tags(tags):
    """Builds a short user-facing recommendation reason from deterministic factors."""
    tag_map = {
        tag.get("key"): tag.get("value")
        for tag in tags or []
        if isinstance(tag, dict) and tag.get("key") is not None
    }

    profession_fit = _safe_float(
        tag_map.get("profession_fit", tag_map.get("skill_match")),
        None,
    )
    availability_fit = _safe_float(tag_map.get("availability_fit"), None)
    history_fit = _safe_float(
        tag_map.get("hospital_history", tag_map.get("past_shift_history")),
        None,
    )
    rating_fit = _safe_float(
        tag_map.get("hospital_rating", tag_map.get("staff_reliability")),
        None,
    )

    top_factors = []
    if profession_fit is not None and profession_fit >= 80:
        top_factors.append("strong role/skill match")
    if availability_fit is not None and availability_fit >= 80:
        top_factors.append("schedule fits your availability")
    if history_fit is not None and history_fit >= 60:
        top_factors.append("good prior shift history")
    if rating_fit is not None and rating_fit >= 70:
        top_factors.append("high quality workplace rating")

    if not top_factors:
        if profession_fit is not None and profession_fit >= 60:
            top_factors.append("good role/skill alignment")
        if availability_fit is not None and availability_fit >= 60:
            top_factors.append("reasonable schedule alignment")
        if rating_fit is not None and rating_fit >= 60:
            top_factors.append("positive workplace quality signal")

    if not top_factors:
        return "Balanced match based on skills, schedule fit, history, and rating."

    return f"Best for you due to {', '.join(top_factors[:3])}."


def _reason_uniqueness_suffix(row):
    role = str(row.get("role") or "").strip()
    department = str(row.get("department") or "").strip()
    match = row.get("match")
    ai_score = row.get("ai_score")

    if department and role:
        return f"{department} / {role}"
    if department:
        return department
    if role:
        return role
    if ai_score is not None:
        return f"AI {int(_safe_float(ai_score, 0))}%"
    if match is not None:
        return f"Match {int(_safe_float(match, 0))}%"
    return f"ID {row.get('id', 'N/A')}"


def ensure_unique_reason_messages(rows):
    """
    Ensures ai_reason_short is unique within the response list.
    If duplicate messages are detected, append a short differentiator.
    """
    seen = {}
    for row in rows:
        reason = str(row.get("ai_reason_short") or "").strip()
        if not reason:
            reason = synthesize_short_reason_from_tags(row.get("tags", []))
            row["ai_reason_short"] = reason

        key = reason.lower()
        seen_count = seen.get(key, 0)
        if seen_count > 0:
            suffix = _reason_uniqueness_suffix(row)
            base = reason.rstrip(".")
            row["ai_reason_short"] = f"{base} ({suffix})."
        seen[key] = seen_count + 1

    return rows


def _build_prompt(mode, context, candidates):
    safe_candidates = []
    for item in candidates:
        tags = {
            tag.get("key"): tag.get("value")
            for tag in item.get("tags", [])
            if isinstance(tag, dict) and tag.get("key") is not None
        }
        safe_candidates.append(
            {
                "id": item.get("id"),
                "name": item.get("name"),
                "role": item.get("role"),
                "department": item.get("department"),
                "base_match": item.get("match"),
                "rating": item.get("rating"),
                "completed_shifts": item.get("completed_shifts"),
                "tags": tags,
            }
        )

    context_json = json.dumps(context, ensure_ascii=True)
    candidates_json = json.dumps(safe_candidates, ensure_ascii=True)
    objective = (
        "Recommend top hospitals for a staff member"
        if mode == "staff_to_hospitals"
        else "Recommend top staff for a hospital shift"
    )

    return (
        "You are a healthcare staffing recommendation assistant.\n"
        f"Objective: {objective}.\n"
        "Use only the provided context and candidates. Do not invent facts.\n"
        "Return strict JSON with this shape:\n"
        "{\n"
        '  "ranked": [\n'
        "    {\n"
        '      "id": "<candidate id>",\n'
        '      "ai_score": <0-100 number>,\n'
        '      "reason_short": "<max 120 chars>",\n'
        '      "reason_details": ["<factor 1>", "<factor 2>", "<factor 3>"],\n'
        '      "confidence": "LOW|MEDIUM|HIGH"\n'
        "    }\n"
        "  ]\n"
        "}\n"
        "Ranking rules: prioritize skill/profession fit, availability fit, shift history, reliability/rating.\n"
        f"Context: {context_json}\n"
        f"Candidates: {candidates_json}\n"
    )


def enhance_recommendations_with_ai(mode, candidates, context):
    """
    Adds ai_score/ai_reasoning to deterministic recommendations.
    Falls back to deterministic list if AI is disabled or fails.
    """
    meta = {
        "enabled": _to_bool(os.getenv("AI_RECOMMENDATIONS_ENABLED", "false")),
        "provider": os.getenv("AI_PROVIDER", "firebase_gemini"),
        "model": os.getenv("AI_MODEL", "gemini-2.5-flash"),
        "applied": False,
        "fallback_reason": None,
    }

    if not candidates:
        meta["fallback_reason"] = "no_candidates"
        return candidates, meta

    if not meta["enabled"]:
        meta["fallback_reason"] = "disabled"
        return candidates, meta

    api_key = os.getenv("FIREBASE_API_KEY")
    if not api_key:
        meta["fallback_reason"] = "firebase_api_key_missing"
        return candidates, meta

    timeout_seconds = max(_safe_int(os.getenv("AI_TIMEOUT_SECONDS"), 8), 1)
    max_retries = max(_safe_int(os.getenv("AI_MAX_RETRIES"), 1), 0)
    model = meta["model"]

    prompt = _build_prompt(mode=mode, context=context, candidates=candidates)
    endpoint = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{model}:generateContent?key={api_key}"
    )
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.2,
            "responseMimeType": "application/json",
        },
    }

    response_data = None
    last_error = None
    for _ in range(max_retries + 1):
        request_obj = urlrequest.Request(
            endpoint,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urlrequest.urlopen(request_obj, timeout=timeout_seconds) as response:
                response_data = json.loads(response.read().decode("utf-8"))
                break
        except (urlerror.URLError, urlerror.HTTPError, TimeoutError, json.JSONDecodeError) as exc:
            last_error = str(exc)

    if not response_data:
        meta["fallback_reason"] = f"ai_call_failed:{last_error or 'unknown'}"
        return candidates, meta

    raw_text = _extract_text_response(response_data)
    parsed = _parse_json_text(raw_text)
    ranked = parsed.get("ranked") if isinstance(parsed, dict) else None
    if not isinstance(ranked, list):
        meta["fallback_reason"] = "invalid_ai_payload"
        return candidates, meta

    ai_map = {}
    for item in ranked:
        if not isinstance(item, dict):
            continue
        item_id = str(item.get("id", "")).strip()
        if not item_id:
            continue
        ai_map[item_id] = {
            "ai_score": int(max(0, min(100, round(_safe_float(item.get("ai_score"), 0))))),
            "ai_reason_short": str(item.get("reason_short", "")).strip()[:140],
            "ai_reason_details": _normalize_reason_list(item.get("reason_details", [])),
            "ai_confidence": _normalize_confidence(item.get("confidence")),
        }

    if not ai_map:
        meta["fallback_reason"] = "empty_ai_rankings"
        return candidates, meta

    merged = []
    for index, candidate in enumerate(candidates):
        row = dict(candidate)
        ai = ai_map.get(str(candidate.get("id")))
        if ai:
            if not ai.get("ai_reason_short"):
                ai["ai_reason_short"] = synthesize_short_reason_from_tags(row.get("tags", []))
            row.update(ai)
            row["_ai_sort"] = ai["ai_score"]
        else:
            row["ai_score"] = row.get("match", 0)
            row["ai_reason_short"] = synthesize_short_reason_from_tags(row.get("tags", []))
            row["ai_reason_details"] = []
            row["ai_confidence"] = "LOW"
            row["_ai_sort"] = row.get("match", 0)
        row["_baseline_index"] = index
        merged.append(row)

    merged.sort(key=lambda item: (-item["_ai_sort"], item["_baseline_index"]))
    for item in merged:
        item.pop("_ai_sort", None)
        item.pop("_baseline_index", None)

    meta["applied"] = True
    return merged, meta

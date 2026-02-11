#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""

import os
import sys
from platform import python_version
from dotenv import load_dotenv


def _is_runserver_command(argv):
    return len(argv) > 1 and argv[1] == "runserver"


def _should_print_startup_status(argv):
    if os.getenv("DJANGO_STARTUP_STATUS", "1") == "0":
        return False

    # runserver starts with an autoreloader parent process and a child process;
    # show status only in the child to avoid duplicate output.
    if _is_runserver_command(argv) and os.getenv("RUN_MAIN") != "true":
        return False

    return True


def _print_startup_status(argv):
    try:
        from django import get_version, setup
        from django.conf import settings
        from django.db import connections
        from django.db.migrations.executor import MigrationExecutor

        setup()

        db = settings.DATABASES.get("default", {})
        command = " ".join(argv[1:]) if len(argv) > 1 else "none"

        print("\n[Startup Status]")
        print(f"- Command: {command}")
        print(f"- Django: {get_version()}")
        print(f"- Python: {python_version()}")
        print(f"- DEBUG: {settings.DEBUG}")
        print(f"- SECRET_KEY set: {'yes' if bool(settings.SECRET_KEY) else 'no'}")
        print(f"- DB Engine: {db.get('ENGINE', 'not-set')}")
        print(
            f"- DB Target: {db.get('HOST', 'n/a')}:{db.get('PORT', 'n/a')}/"
            f"{db.get('NAME', 'n/a')}"
        )

        connection = connections["default"]
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
            print("- DB Connection: OK")
        except Exception as exc:
            print(f"- DB Connection: FAILED ({exc.__class__.__name__}: {exc})")
            print("[End Startup Status]\n")
            return

        try:
            executor = MigrationExecutor(connection)
            targets = executor.loader.graph.leaf_nodes()
            pending_migrations = len(executor.migration_plan(targets))
            print(f"- Pending Migrations: {pending_migrations}")
        except Exception as exc:
            print(
                f"- Pending Migrations: unavailable "
                f"({exc.__class__.__name__}: {exc})"
            )

        print("[End Startup Status]\n")
    except Exception as exc:
        print(f"\n[Startup Status] unavailable ({exc.__class__.__name__}: {exc})\n")


def main():
    """Run administrative tasks."""
    load_dotenv()
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    if _should_print_startup_status(sys.argv):
        _print_startup_status(sys.argv)

    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()

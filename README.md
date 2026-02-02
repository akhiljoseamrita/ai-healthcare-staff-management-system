# Healthcare Staff Management System

A web platform connecting hospitals and staff, featuring AI recommendations for shift matching.

## Tech Stack
- **Frontend:** React.js (Vite)
- **Backend:** Python Django
- **Database:** Supabase (PostgreSQL)

## Structure
- `backend/`: Django project (`config`) and apps (`hospital`, `staff`).
- `frontend/`: React application.

## Setup

### Backend
1. Navigate to `backend/`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run migrations: `python manage.py migrate`.
4. Start server: `python manage.py runserver`.

### Frontend
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Start dev server: `npm run dev`.

## AI Features
- **Hospital:** AI recommendations for staff based on availability, performance, and skills.
- **Staff:** AI suggestions for hospitals based on preferences and history.

## Governance
See `AGENTS.md` for development rules and persona guidelines (AkhilJo).

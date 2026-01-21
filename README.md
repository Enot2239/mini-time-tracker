# Mini Time Tracker

A simple full-stack web application for tracking time spent on projects.  
This project was implemented as a test assignment for **Viso Academy**.

---

## Features

- Add time entries with:
  - Date (default: today)
  - Project (predefined list)
  - Hours (supports fractional values)
  - Work description
- View entry history grouped by date
- Automatic calculation of:
  - Total hours per day
  - Grand total across all entries
- Validation:
  - All fields are required
  - Hours must be a positive number
  - Maximum **24 hours per calendar date**

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite

### Backend
- Node.js
- Express
- TypeScript
- REST API

### Database
- SQLite
- Prisma ORM

---

## Project Structure

mini-time-tracker/

backend/ # Express + Prisma backend

frontend/ # React + TypeScript frontend

.gitignore

README.md


---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

---

## Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```
Backend will start on:
```bash
http://localhost:4000
```

Health check:
```bash
GET /health
```
Frontend Setup

In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend will start on:
```bash
http://localhost:5173
```
The frontend is configured to proxy API requests to the backend.
  API Endpoints
Get all entries

GET /api/entries

Create a new entry

POST /api/entries

Request body example:

{
  "date": "2026-01-21",
  "project": "Viso Internal",
  "hours": 2.5,
  "description": "Worked on backend setup"
}

Architecture Notes

    Backend follows a layered structure:

        controllers

        services

        validators

    Prisma is used for database access and migrations

    Frontend components are separated by responsibility

    All business rules (e.g. 24h/day limit) are enforced on the backend

Author

Mykhailo Persikov
Submission

This repository was created as part of a technical test assignment.
The solution is available on the branch:

Mykhailo_Persikov

# 🏢 Corporate Team Manager (Frontend)

This repository contains the frontend application for a corporate team management system. It allows users to manage teams, projects, and employees. The application is built with **Vue 3 (Composition API)** and **TypeScript** to ensure reliability and type safety.

The project uses **Vite** as the build tool and **Bootstrap 5** for UI styling.

---

## 🚀 Features

- **Team Listing**: View all available teams (with optional pagination) and their associated projects.
- **CRUD Operations**:
    - Create new teams.
    - Edit existing teams (change name, team lead, project).
    - Delete teams.
- **Detailed View**: dedicated page for a specific team showing its members.
- **Type Safety**: Full TypeScript support for all API responses and component props.

---

## 🛠 Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Script Setup + Composition API)
- **Language**: TypeScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: Vue Router 4
- **HTTP Client**: Axios (with a configured base instance)
- **UI Framework**: Bootstrap 5
- **Linter**: ESLint + Prettier (configured via Vue TSC)

---

## 📂 Project Structure

The project follows Vue 3 best practices:

```text
src/
├── api/             # Backend interaction layer
│   ├── api.ts       # Base Axios configuration
│   ├── teams.ts     # API methods for Teams (CRUD)
│   └── types.ts     # TypeScript interfaces (Team, Employee, Project)
├── assets/          # Static assets (images, global styles)
├── router/          # Routing configuration
├── views/           # Application pages (TeamsList, TeamDetail, TeamCreate)
├── App.vue          # Root component
└── main.ts          # Entry point
```

## ⚡ How to Run Locally

### 1. Prerequisites
Make sure you have **Node.js** installed (version 18+ recommended).

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

## 🔗 API Integration
The application expects a REST API with the following endpoints (configured in src/api/teams.ts):

- `GET /api/teams/` — Get list of teams
- `POST /api/teams/` — Create a new team
- `GET /api/teams/{id}` — Get team details
- `PATCH /api/teams/{id}` — Update a team
- `DELETE /api/teams/{id}` — Delete a team
# Voting App Frontend

This is the frontend of the Voting App, built with **React + Vite**.  
It connects to the backend APIs for authentication, voting, and admin management.

---

## Features
- User registration & login
- Token-based authentication with localStorage
- Protected routes for users and admins
- Vote for existing names or add new
- View voting results
- Admin pages:
  - Manage users (edit role, delete user)
  - View voting summary  

---

## Tech Stack
- React + Vite
- React Router DOM
- Axios (API calls)

---

## Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/voting-app-frontend.git
cd voting-app-frontend
```

### 2. Instal dependencies
```bash
npm install
```

### 3. Configure API base URL
In src/api/axios.js, update:
```bash
const api = axios.create({
  baseURL: "http://localhost:5000",
});
```

Frontend will run at: http://localhost:5173

---

## Pages
- /register => Register a new user
- /login => Login
- /vote → Voting page
- /results → Public results page
- /users → Admin manage users
- /summary → Admin voting summary

---

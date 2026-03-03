# QuickHire - Job Board Application

Welcome to the **QuickHire** repository! This is a fully functional, full-stack mini job board application built as an evaluation task. It faithfully implements the provided Figma UI design while offering a robust backend API and real-time database integration.

## 🚀 Live Demo Features for Evaluators
To streamline your review process, the application features a **1-Click Demo Access** system.
1. Navigate to the Login Page (`/login`).
2. Click either **Login as Admin** or **Login as User**.
3. The system will automatically authenticate you, initialize your secure profile in MongoDB, and instantly grant you the correct Role-Based Access controls (RBAC) without manual signups.

## 🛠️ Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, React Router DOM, contextual state management.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Native Driver).
- **Authentication**: Firebase (Google OAuth & Email/Password), mapped to MongoDB Roles.

## ✨ Core Features Designed
- **Pixel-Perfect UI**: Matched typography, spacing, and dynamic active states strictly mapped to the provided Figma template.
- **Dynamic Job Feeds**: Filterable and searchable job listings populated directly from the backend.
- **Role-Based Access Control (RBAC)**:
  - **Normal Users**: Can browse jobs, view details, and securely submit applications.
  - **Administrators**: Get exclusive access to an `/admin` dashboard perfectly guarded by a custom `AdminRoute` and `useAdmin()` hook to construct and delete Job Posts.
- **Firebase Auth Pipeline**: Secure authentication mapping users directly into the MongoDB `users` collection.
- **Detailed Component Rendering**: Cards dynamically switch out fallback branding if Company Logos are unprovided.

## ⚙️ How to Run Locally

### Prerequisites
- Node.js installed
- MongoDB URI (or local instance)
- Firebase config keys

### 1. Start the Backend Server
```bash
cd quick_hire_backend
npm install
npm start (or nodemon index.js)
```
*(Runs on http://localhost:3000)*

### 2. Start the Frontend Client
```bash
cd quick_hire_frontend
npm install
npm run dev
```
*(Runs on http://localhost:5173 - Standard Vite Port)*

---
*Built meticulously observing clean code architecture, RESTful API practices, and rigorous component reusability.*

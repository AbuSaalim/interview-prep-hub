# 🚀 PrepHub - Coding Interview Preparation Portal

A modern, fast, and interactive Full-Stack Web Application built to help developers prepare for coding interviews. It features a built-in live code editor, an interactive admin panel to manage topics, and secure authentication.

## ✨ Features

- **Interactive Live Code Editor:** Built with Sandpack to write and test React code directly in the browser with a live console.
- **Custom Admin Dashboard:** A fully functional CRUD interface to Add, Edit, and Delete topics easily.
- **Dynamic Sidebar:** Automatically categorizes topics into Folders and Direct Files.
- **Secure Authentication:** Google Sign-in powered by Firebase Auth, with strict Admin-only route protection.
- **Modern UI/UX:** Premium dark theme, glassmorphism effects, Framer Motion animations, and custom Toast notifications.

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes (Serverless)
- **Database:** MongoDB (Mongoose)
- **Authentication:** Firebase Auth (Google Provider)
- **Live Editor:** @codesandbox/sandpack-react
- **Alerts:** React Hot Toast

---

## 💻 Local Setup Guide (Step-by-Step)

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (for the database URI)
- A [Firebase](https://firebase.google.com/) project (for authentication)

### Step 1: Clone the Repository

Open your terminal and clone the repository:

```bash
git clone [https://github.com/your-username/interview-prep-hub.git](https://github.com/your-username/interview-prep-hub.git)
cd interview-prep-hub



Step 2: Install Dependencies
Install all the required backages using npm:
npm install

Step 3: Setup Environment Variables
Create a .env.local file in the root directory of the project and add your database and filebase credentials.

# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/prephub

# Firebase Authentication Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id




Step 4: Configure Admin Email
To access the Admin Panel, you need to set your Google email as the Admin.

Open app/context/AuthContext.jsx.

Find the ADMIN_EMAIL Variable and replace it with the email you will us to log in via Google:

const ADMIN_EMAIL = "your-email@gmail.com";



Step 5: Run the Development Server
Start the local Next.js server:

npm run dev


Open http://localhost:3000 in your browser.
To access the admin dashboard, login with your Admin email and navigate to http://localhost:3000/admin.


⁇  ⁇  ⁇  Author
Salim Ansari

GitHub: @AbuSaalim

LinkedIn: https://www.linkedin.com/in/abu-salim-ansari/

Feel free to fork this repository, submit pull requests, or drip a ⭐ if you like this project!
```

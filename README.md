# Expense Tracker

<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="nextjs" />
    <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logo=typescript&logoColor=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logo=tailwindcss&logoColor=white&color=38BDF8" alt="tailwind" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logo=prisma&logoColor=white&color=2D3748" alt="prisma" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logo=postgresql&logoColor=white&color=336791" alt="postgresql" />
  </div>
</div>

---

## 📋 Table of Contents

1. 🎮 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🎯 [Features](#features)
4. 🚀 [Quick Start](#quick-start)
5. 📁 [Project Structure](#project-structure)
6. 🔮 [Future Enhancements](#future-enhancements)
7. 📄 [License](#license)
8. 🙏 [Acknowledgements](#acknowledgements)

---

## 🎮 Introduction

A modern, interactive expense tracker built with Next.js and TypeScript. Keep track of your income and expenses with a clean, intuitive interface.

This application allows users to log in, add transactions (both income and expenses), view their current balance, and see a history of their transactions.

---

## ⚙️ Tech Stack

- **Framework:** Next.js 15 with React 19
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** Kinde
- **Styling:** TailwindCSS with ShadCN UI components
- **UI Components:** Radix UI
- **Charts:** Recharts
- **Notifications:** Sonner
- **3D Visualization:** React Three Fiber & Drei
- **Icons:** Lucide React

---

## 🎯 Features

- **User Authentication**
  - Secure login and registration with Kinde.
- **Transaction Management**
  - Add new income or expense transactions.
  - View a list of all transactions.
- **Dashboard**
  - View your current balance.
  - See a visual representation of your finances.
- **Modern UI/UX**
  - Responsive design for all devices.
  - Clean, intuitive interface.
  - Toast notifications for user actions.

---

## 🚀 Quick Start

### 🔧 Prerequisites

- Node.js (>=18.x recommended)
- npm or yarn
- Git
- PostgreSQL

### 📁 Clone the Repo

```bash
git clone <repository-url>
cd expense-tracker
```

### 📦 Install Dependencies

```bash
npm install
# or
yarn install
```

### ⚙️ Environment Variables

Create a `.env.local` file in the root of the project and add the following variables:

```
DATABASE_URL="your-database-url"

KINDE_CLIENT_ID="your-kinde-client-id"
KINDE_CLIENT_SECRET="your-kinde-client-secret"
KINDE_ISSUER_URL="your-kinde-issuer-url"
KINDE_SITE_URL="http://localhost:3000"
KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/dashboard"
```

### 🏃 Run Migrations

```bash
npx prisma migrate dev
```

### ▶️ Run the App

```bash
npm run dev
# or
yarn dev
```

Visit 👉 http://localhost:3000

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   │   ├── auth/         # Kinde auth routes
│   │   └── balance/      # Balance API endpoint
│   ├── dashboard/        # Dashboard page
│   ├── create/           # Create transaction page
│   └── page.tsx          # Landing page
├── actions/              # Server actions
│   ├── addTransactions.ts
│   └── getTransactions.ts
├── components/           # React components
│   ├── Navbar.tsx
│   ├── DashboardClient.tsx
│   └── ui/               # ShadCN UI components
├── lib/                  # Utility functions
│   ├── db.ts             # Prisma client
│   └── checkUser.ts
└── prisma/               # Prisma schema and migrations
```

---

## 🔮 Future Enhancements

- Add more detailed charts and graphs for expense categorization.
- Implement budget planning and tracking.
- Add support for multiple currencies.
- Create user profiles with customizable settings.
- Add a mobile app.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- Built with Next.js and React.
- UI components from ShadCN UI and Radix UI.
- Authentication by Kinde.


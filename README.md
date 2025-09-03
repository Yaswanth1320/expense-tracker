# Expense Tracker

This is a Next.js application for tracking personal expenses.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (or your preferred database with Prisma)
- **Authentication:** [Kinde](https://kinde.com/)
- **UI:**
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Radix UI](https://www.radix-ui.com/)
  - [Recharts](https://recharts.org/) for charts
  - [Sonner](https://sonner.emilkowal.ski/) for notifications
- **3D Visualization:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) & [Drei](https://github.com/pmndrs/drei)

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm
- A PostgreSQL database (or other database compatible with Prisma)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

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

   **Note:** You can get the Kinde credentials from your Kinde dashboard.

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Creates a production build.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase using ESLint.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
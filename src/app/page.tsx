import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="min-h-[90vh] bg-background text-foreground font-sans flex flex-col px-6 sm:px-12 lg:px-24 text-center">
      {/* Main content - grows to fill available space */}

      <div className="flex-1 flex items-center justify-center">
        {!user ? (
          // Not signed in - Show sign in prompt
          <header className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Expense Tracker
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Sign in to app and track your expenses with smart insights,
              detailed reports, and a clean, modern interface.
            </p>
            <div className="flex justify-center gap-4">
              <LoginLink className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-primary/90 transition-colors">
                Sign In to App
              </LoginLink>
              <a
                href="/about"
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-secondary/90 transition-colors"
              >
                Learn More
              </a>
            </div>
          </header>
        ) : (
          // Signed in - Show welcome message
          <header className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome back!
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Hello {user.given_name || user.email}! Ready to track your
              expenses and manage your finances?
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/dashboard"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-primary/90 transition-colors"
              >
                Go to Dashboard
              </a>
              <a
                href="/create"
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-secondary/90 transition-colors"
              >
                Add Expense
              </a>
            </div>
          </header>
        )}
      </div>

      {/* Footer - stays at bottom */}
      <footer className="py-6 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Expense Tracker. Built with ❤️ using
        Next.js & Tailwind CSS.
      </footer>
    </div>
  );
}

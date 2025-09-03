import Link from "next/link";
import Image from "next/image";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Home, PlusCircle, Info, LayoutDashboard, LogOut } from "lucide-react"; // icons
import { checkUser } from "@/lib/checkUser";

export default async function Navbar() {
  const user = await checkUser();

  return (
    <nav className="w-full bg-background border-b border-border px-6 sm:px-12 py-4 flex items-center justify-between font-[var(--font-space-grotesk)]">
      {/* Logo / Brand */}
      <Link
        href="/"
        className="text-2xl font-bold text-primary hover:opacity-80 transition"
      >
        Expense Tracker
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="flex items-center gap-1 text-foreground hover:text-primary transition-all hover:scale-105"
        >
          <Home className="w-4 h-4" />
          <span className="text-sm">Home</span>
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-foreground hover:text-primary transition-all hover:scale-105"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-sm">Dashboard</span>
        </Link>

        <Link
          href="/about"
          className="flex items-center gap-1 text-foreground hover:text-primary transition-all hover:scale-105"
        >
          <Info className="w-4 h-4" />
          <span className="text-sm">About</span>
        </Link>

        {/* Auth Controls */}
        {!user ? (
          <LoginLink className="bg-primary text-sm text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 hover:scale-105 transition-transform">
            Sign In
          </LoginLink>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/create"
              className="flex items-center gap-1 text-foreground hover:text-primary transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="text-sm">Add Expense</span>
            </Link>
            {user?.imageUrl && (
              <Image
                src={user.imageUrl || "./user.jpeg"}
                alt={user.name || "User"}
                width={28}
                height={28}
                className="rounded-full border border-border hover:scale-105 transition-transform"
              />
            )}
            <LogoutLink className="group flex items-center justify-center w-9 h-9 hover:text-white rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-110 hover:shadow-lg" title="Sign Out">
              <LogOut className="w-4 h-4 transition-transform duration-200" />
            </LogoutLink>
          </div>
        )}
      </div>
    </nav>
  );
}

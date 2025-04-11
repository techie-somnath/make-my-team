import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="MakeMyTeam Logo"
            className="h-8 w-auto"
          />
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
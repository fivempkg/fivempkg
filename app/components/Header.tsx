import { Link } from "react-router";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">fivempkg</h1>
      <nav>
        <ul className="flex">
          <li>Documentation</li>
        </ul>
      </nav>

      <nav className="flex items-center space-x-2">
        <Link to="/login" className="h-8">
          <Button variant="link">
            <span className="text-sm font-medium">Sign In</span>
          </Button>
        </Link>
        <Link to="/signup" className="h-8">
          <Button>
            <span className="text-sm font-medium">Sign Up</span>
          </Button>
        </Link>
      </nav>
    </header>
  );
}

import Link from "next/link";
import User from "@app/components/user";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-around">
      <Link className="flex items-center justify-center" href="#">
        <span className="text-2xl font-bold">Twitchy</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Find Streams
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Statistics
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Compare
        </Link>
      </nav>
      <div className="ml-6">
        <User />
      </div>
    </header>
  );
}

export default Header;
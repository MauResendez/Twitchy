import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@app/components/ui/avatar";
import ThemeToggle from "@app/components/toggle";

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
        {/* <Avatar>
          <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar> */}
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
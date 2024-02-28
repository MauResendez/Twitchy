import Drawer from "@app/components/drawer";
import Link from "next/link";
import ThemeToggle from "./toggle";

const Mobile = () => {
  return (
    <header className="flex sm:hidden sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Drawer />
        <Link href="/" className="flex flex-1 text-center justify-center">
          <span className="text-2xl font-bold">
            Twitchy
          </span>
        </Link>
        <div className="flex justify-end">
          <nav className="flex">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Mobile;
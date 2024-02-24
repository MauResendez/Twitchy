
import { cn } from "@app/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Auth from "./auth";

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="hidden sm:flex sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold">
            Twitchy
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link 
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/mixer" ? "text-foreground" : "text-foreground/60"
            )}
            href="/mixer"
          >
            Mixer
          </Link>
          <Link 
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/channels" ? "text-foreground" : "text-foreground/60"
            )}
            href="/channels"
          >
            Channels
          </Link>
          <Link 
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/clips" ? "text-foreground" : "text-foreground/60"
            )}
            href="/clips"
          >
            Clips
          </Link>
          <Link 
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/statistics" ? "text-foreground" : "text-foreground/60"
            )}
            href="/statistics"
          >
            Statistics
          </Link>
          <Link 
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/badges" ? "text-foreground" : "text-foreground/60"
            )}
            href="/badges"
          >
            Badges
          </Link>
          <Link 
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/emotes" ? "text-foreground" : "text-foreground/60"
            )}
            href="/emotes"
          >
            Emotes
          </Link>
        </nav>
        <div className="flex items-center justify-between md:justify-end">
          <nav className="flex items-center">
            <Auth />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header;
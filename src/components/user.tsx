import { signIn, signOut, useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@app/components/ui/dropdown-menu"
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const User = () => {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  switch (status) {
    // case "loading":
    //   return (
    //     <CircularProgress size="md" aria-label="Loading..." />
    //   );
    case "unauthenticated":
      return (
        <button className="text-sm font-medium hover:underline underline-offset-4" onClick={() => signIn("twitch")}>Sign In</button>
      );
    case "authenticated":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage alt="User Avatar" src={session.user!.image as string} />
              <AvatarFallback>{session.user!.name!.at(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              {session.user!.name}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => theme == "light" ? setTheme("dark") : setTheme("light")}>
              Change theme
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
  }
}

export default User;
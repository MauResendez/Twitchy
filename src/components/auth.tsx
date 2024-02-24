
import { Icons } from "@app/components/ui/spinner";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';

import {
  Github,
  LifeBuoy,
  LogOut,
  MoonIcon,
  SunIcon,
  User
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@app/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Auth = () => {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  switch (status) {
    case "loading":
      return (
        <Icons.spinner className="h-8 w-8 animate-spin" />
      );
    case "unauthenticated":
      return (
        <button className="text-sm font-medium hover:underline underline-offset-4" onClick={() => signIn("twitch")}>Sign In</button>
      );
    case "authenticated":
      return (
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Avatar>
        //       <AvatarImage alt="User Avatar" src={session.user!.image as string} />
        //       <AvatarFallback>{session.user!.name!.at(0)}</AvatarFallback>
        //     </Avatar>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuItem>
        //       {session.user!.name}
        //     </DropdownMenuItem>
        //     <DropdownMenuItem onClick={() => theme == "light" ? setTheme("dark") : setTheme("light")}>
        //       Change theme
        //     </DropdownMenuItem>
        //     <DropdownMenuItem onClick={() => signOut()}>
        //       Sign Out
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage alt="User Avatar" src={session.user!.image as string} />
              <AvatarFallback>{session.user!.name!.at(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`https://twitch.tv/${session.user!.name}`}>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>{session.user!.name}</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => theme == "light" ? setTheme("dark") : setTheme("light")}>
                {theme == "light" ? <SunIcon className="mr-2 h-4 w-4" /> : <MoonIcon className="mr-2 h-4 w-4" />}
                <span>Change theme</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Link href="https://github.com/MauResendez/Twitchy">
              <DropdownMenuItem>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </DropdownMenuItem>
            </Link>
            <Link href="https://github.com/MauResendez">
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
  }
}

export default Auth;
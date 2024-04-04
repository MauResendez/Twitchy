"use client"

import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@app/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@app/components/ui/sheet";
import { cn } from "@app/utils";
import { ScrollArea } from "./ui/scroll-area";

const Drawer = () => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 mr-4 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <span className="text-2xl font-bold">Twitchy</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            <MobileLink 
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/mixer" ? "text-foreground" : "text-foreground/60"
              )}
              href="/mixer"
              onOpenChange={setOpen}
            >
              Mixer
            </MobileLink>
            <MobileLink 
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/channels" ? "text-foreground" : "text-foreground/60"
              )}
              href="/channels"
              onOpenChange={setOpen}
            >
              Channels
            </MobileLink>
            <MobileLink 
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/clips" ? "text-foreground" : "text-foreground/60"
              )}
              href="/clips"
              onOpenChange={setOpen}
            >
              Clips
            </MobileLink>
            <MobileLink 
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/badges" ? "text-foreground" : "text-foreground/60"
              )}
              href="/badges"
              onOpenChange={setOpen}
            >
              Badges
            </MobileLink>
            <MobileLink 
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/emotes" ? "text-foreground" : "text-foreground/60"
              )}
              href="/emotes"
              onOpenChange={setOpen}
            >
              Emotes
            </MobileLink>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export default Drawer;
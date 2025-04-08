"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown, Sun, Moon, LogOut, Settings, User2 } from "lucide-react";
import { useTheme } from "next-themes";

import { useClerk, useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

const HeaderSidebar = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();

  if (!user) return <Skeleton className="w-full h-8" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-between w-full px-3 py-5 hover:bg-accent/50 transition-all duration-200 border hover:cursor-pointer border-muted-foreground/30!"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{user?.username}</span>
          </div>
          <ArrowUpDown className="w-4 h-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 p-2 space-y-2 rounded-xl shadow-lg border bg-background"
      >
        <DropdownMenuLabel className="px-2 py-1.5 text-sm font-normal text-muted-foreground">
          Signed in as <span className="font-medium">{user?.username}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          className="px-2 py-1.5 rounded-md text-sm focus:bg-accent focus:text-accent-foreground transition-colors hover:cursor-pointer"
          onClick={() => {
            openUserProfile();
          }}
        >
          <User2 className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="px-2 py-1.5 rounded-md text-sm focus:bg-accent focus:text-accent-foreground transition-colors hover:cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="px-2 py-1.5 rounded-md text-sm focus:bg-accent focus:text-accent-foreground transition-colors hover:cursor-pointer">
            <Sun className="mr-4 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute mr-4 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="rounded-lg">
            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
              <DropdownMenuRadioItem
                value="light"
                className="pl-8 hover:cursor-pointer"
              >
                <Sun className="w-4 h-4" />
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="dark"
                className="pl-8 hover:cursor-pointer"
              >
                <Moon className="w-4 h-4" />
                Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="system"
                className="pl-8 hover:cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          className="px-2 py-1.5 rounded-md text-sm transition-colors hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800"
          onClick={() => {
            signOut();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderSidebar;

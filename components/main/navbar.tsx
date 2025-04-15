"use client";
import { usePathname } from "next/navigation";
import { generateNavbarTitle } from "@/utils/components/generate-navbar-title";
import Image from "next/image";
import { ThemeToggleClick } from "../theme-toggle-click";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between px-4 h-16 max-h-16 border-b border-muted-foreground/30 w-full bg-background">
      <div className="flex items-center justify-center gap-x-4">
        <Image
          src="/logo.png"
          alt="Docufy's Logo"
          width={35}
          height={35}
          className="invert dark:invert-0"
        />
        <h1 className="text-xl font-bold">{generateNavbarTitle(pathname)}</h1>
      </div>
      <ThemeToggleClick />
    </div>
  );
};

export default Navbar;

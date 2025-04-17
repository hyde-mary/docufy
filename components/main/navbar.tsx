"use client";
import { usePathname } from "next/navigation";
import { generateNavbarTitle } from "@/utils/components/generate-navbar-title";
import Image from "next/image";
import { ThemeToggleClick } from "../theme-toggle-click";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between px-4 h-16 max-h-16 border-b border-muted-foreground/30 w-full bg-background">
      {/* Left side */}
      <div className="flex items-center gap-x-4 flex-1 min-w-0">
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden shrink-0"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu />
        </Button>

        <Image
          src="/logo.png"
          alt="Docufy's Logo"
          width={35}
          height={35}
          className="invert dark:invert-0 shrink-0"
        />

        <div className="flex-1 min-w-0 pr-8">
          <h1 className="text-xl font-bold truncate">
            {generateNavbarTitle(pathname)}
          </h1>
        </div>
      </div>

      <div className="flex shrink-0">
        <ThemeToggleClick />
      </div>
    </div>
  );
};

export default Navbar;

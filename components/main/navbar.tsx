"use client";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-start px-6 h-16 max-h-16 border-b border-muted-foreground/30 w-full">
      <h1 className="text-xl font-bold">
        {pathname === "/" ? "Home" : pathname}
      </h1>
    </div>
  );
};

export default Navbar;

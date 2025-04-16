import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus, Search } from "lucide-react";

import Link from "next/link";

interface MainViewHeaderProps {
  viewType: "project" | "archive" | "public";
  setSearchQuery: (query: string) => void;
}

const MainViewHeader = ({ viewType, setSearchQuery }: MainViewHeaderProps) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {viewType === "project" && (
        <Link href={"/projects/new/"}>
          <Button variant={"outline"} className="hover:cursor-pointer">
            <Plus className="w-4 h-4" />
            <span className="text-xs">New project</span>
          </Button>
        </Link>
      )}
      <div className="relative max-w-64 w-full">
        <Search
          size={16}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        <Input
          className="pl-8"
          placeholder="Search for a project"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MainViewHeader;

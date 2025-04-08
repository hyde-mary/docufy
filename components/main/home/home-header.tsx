import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import Link from "next/link";

const HomeHeader = () => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <Link href={"/projects/new/"}>
        <Button
          variant={"outline"}
          size={"sm"}
          className="h-7 hover:cursor-pointer"
        >
          <span className="text-xs">New project</span>
        </Button>
      </Link>
      <div className="relative max-w-64 w-full">
        <Search
          size={16}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        <Input className="pl-8 h-7" placeholder="Search for a project" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"sm"} className="h-7 w-7">
            <Filter size={10} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2">
          <DropdownMenuLabel className="text-xs font-bold">
            Filter projects by status
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs">Active</DropdownMenuItem>
          <DropdownMenuItem className="text-xs">Trash</DropdownMenuItem>
          <DropdownMenuItem className="text-xs">Archived</DropdownMenuItem>
          <DropdownMenuItem className="text-xs">Published</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HomeHeader;

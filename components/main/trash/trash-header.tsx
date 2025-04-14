import { Filter, Search } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TrashHeader = () => {
  return (
    <div className="flex items-center justify-center space-x-4">
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
            Filter projects by attributes
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs font-bold">
              Project&apos;s Status
            </DropdownMenuLabel>
            <DropdownMenuItem className="text-xs pl-4">Active</DropdownMenuItem>
            <DropdownMenuItem className="text-xs pl-4">Paused</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs font-bold">
              Project&apos;s Visibility
            </DropdownMenuLabel>
            <DropdownMenuItem className="text-xs pl-4">
              Private
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs pl-4">Public</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TrashHeader;

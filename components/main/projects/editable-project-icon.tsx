import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getLucideIcon } from "@/utils/components/get-lucide-icon";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { MinusCircle } from "lucide-react";

type IconName = "Rocket" | "Book" | "Code" | "File" | "Presentation" | "None";

const ICON_OPTIONS: IconName[] = [
  "Rocket",
  "Book",
  "Code",
  "File",
  "Presentation",
  "None",
];

const EditableProjectIcon = ({
  initialIcon,
  projectId,
}: {
  initialIcon: IconName;
  projectId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IconName>(initialIcon);
  const [loading, setLoading] = useState(false);

  const updateProjectIcon = useMutation(
    api.projects_mutations.updateProjectIcon
  );

  const handleIconChange = async (iconName: IconName) => {
    if (loading || iconName === initialIcon) {
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setSelectedIcon(iconName);

    try {
      await updateProjectIcon({
        id: projectId as Id<"projects">,
        iconName,
      });

      toast.success("Icon updated successfully");
    } catch (error) {
      toast.error("Failed to update icon", {
        description: error as string,
      });
      setSelectedIcon(initialIcon);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setSelectedIcon(initialIcon);
  }, [initialIcon]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="group relative flex items-center justify-center h-12 w-12 rounded-full hover:cursor-pointer hover:bg-muted-foreground/30"
          disabled={loading}
        >
          <div className="relative">{getLucideIcon(selectedIcon, 24)}</div>

          <Pencil className="absolute -top-5 -right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="flex flex-col gap-1">
          {ICON_OPTIONS.map((iconName) => (
            <Button
              key={iconName}
              variant="ghost"
              className={cn(
                "flex items-center justify-between px-2 py-1.5 hover:cursor-pointer",
                selectedIcon === iconName && "bg-muted-foreground/30"
              )}
              onClick={() => handleIconChange(iconName)}
            >
              <div className="flex items-center gap-2">
                {iconName === "None" ? (
                  <MinusCircle className="w-4 h-4" />
                ) : (
                  getLucideIcon(iconName, 18)
                )}
                <span>{iconName}</span>
              </div>
              {selectedIcon === iconName && <Check className="w-4 h-4" />}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditableProjectIcon;

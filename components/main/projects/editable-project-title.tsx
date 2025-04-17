import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";
import slugify from "slugify";
import { toast } from "sonner";

const EditableProjectTitle = ({
  initialTitle,
  projectId,
}: {
  initialTitle: string;
  projectId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const updateProject = useMutation(api.projects_mutations.updateProjectTitle);

  const generateSlug = (text: string) => {
    return slugify(text, {
      lower: true,
      strict: true,
      trim: true,
    });
  };

  const handleSave = async () => {
    if (loading || title === initialTitle) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    const slug = generateSlug(title);

    try {
      await updateProject({
        id: projectId as Id<"projects">,
        title,
        slug,
      });

      toast.success("Project update success.");
    } catch (error) {
      toast.error("Project update failed.", {
        description: error as string,
      });
      setTitle(initialTitle);
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      setTitle(initialTitle);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return isEditing ? (
    <Input
      ref={inputRef}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onBlur={() => {
        if (!loading) handleSave();
      }}
      onKeyDown={handleKeyDown}
      disabled={loading}
      className="text-xl md:text-3xl font-semibold w-full max-w-[200px] sm:max-w-xs md:max-w-md"
      autoFocus
    />
  ) : (
    <button
      onClick={() => setIsEditing(true)}
      className={cn(
        "text-xl md:text-3xl font-semibold hover:underline flex items-center gap-2 hover:cursor-pointer group truncate"
      )}
    >
      {title}
      <Pencil className="w-4 h-4 opacity-0 group-hover:opacity-70 transition-opacity duration-200 flex-shrink-0" />
    </button>
  );
};

export default EditableProjectTitle;

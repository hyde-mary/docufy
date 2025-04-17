"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllEditorHrefs } from "@/hooks/use-all-editor-hrefs";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";

const EditorToolbarPathDropdown = () => {
  const hrefs = useAllEditorHrefs();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (hrefs.length > 0) {
      const matchingHref = hrefs.find((item) => item.href === pathname)?.href;
      setSelectedValue(matchingHref || hrefs[0]?.href || "");
    }
  }, [hrefs, pathname]);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    router.push(value);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Label>Path Chooser</Label>
      <div className="flex items-center gap-x-2">
        <p className="text-base text-muted-foreground">Path: </p>
        <Select value={selectedValue} onValueChange={handleValueChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a path" />
          </SelectTrigger>
          <SelectContent>
            {hrefs.map(({ path, href }, index) => (
              <SelectItem key={index} value={href}>
                {path}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="text-xs text-muted-foreground">
        Here you can switch between different paths for your documentation
      </p>
    </div>
  );
};

export default EditorToolbarPathDropdown;

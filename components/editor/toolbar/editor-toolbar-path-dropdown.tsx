"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllEditorHrefs } from "@/hooks/useAllEditorHrefs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const EditorToolbarPathDropdown = () => {
  const hrefs = useAllEditorHrefs();
  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState(hrefs[0]?.href || "");

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
        Here you can switch between different paths for your documentaiton
      </p>
    </div>
  );
};

export default EditorToolbarPathDropdown;

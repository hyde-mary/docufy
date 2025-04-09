import { ChevronLeft, Facebook, Github, Plus, Twitter, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

// zustand
import { useEditorStore } from "@/stores/editor-store";
import { ThemeToggleClick } from "../theme-toggle-click";
import { Switch } from "../ui/switch";

const EditorSidebar = () => {
  const {
    data,
    updateField,
    addNavLink,
    updateNavLink,
    removeNavLink,
    toggleThemeToggle,
    updateSocial,
  } = useEditorStore();

  const socialsIcons = {
    github: <Github />,
    facebook: <Facebook />,
    twitter: <Twitter />,
  };

  return (
    <Card className="flex h-full w-full !rounded-none border border-muted-foreground/15">
      <CardHeader className="text-lg font-bold">
        Docufy&apos;s Editor
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col flex-grow">
        <div className="flex flex-col gap-y-8">
          <h1 className="text-base font-bold underline">Header Options</h1>

          {/* title */}
          <div className="flex flex-col gap-y-4">
            <Label className="font-medium text-sm">Documentation Title</Label>
            <Input
              placeholder="Hydemary's Documentation"
              onChange={(e) => updateField("title", e.target.value)}
              value={data.title}
            />
            <p className="text-xs text-muted-foreground">
              Enter a documentation title
            </p>
          </div>

          {/* nav links */}
          <div className="flex flex-col gap-y-4">
            <Label className="font-medium text-sm">Navigation Links</Label>
            {data.navLinks.map((link, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Name"
                  value={link.name}
                  onChange={(e) =>
                    updateNavLink(index, { ...link, name: e.target.value })
                  }
                  className="flex-1"
                />
                <Input
                  placeholder="Link"
                  value={link.href}
                  onChange={(e) =>
                    updateNavLink(index, { ...link, href: e.target.value })
                  }
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeNavLink(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}

            {/* add button, limit to 7 */}
            {data.navLinks.length < 7 && (
              <Button
                variant="outline"
                onClick={addNavLink}
                size="sm"
                className="flex items-center gap-2 w-full"
              >
                <Plus className="w-4 h-4" />
                Add Nav Link
              </Button>
            )}

            <p className="text-xs text-muted-foreground">
              Here you can add navigation links up to 7 for your documentation.
            </p>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-4">
              <Label>Socials</Label>
            </div>
            <p className="text-xs text-muted-foreground">
              You can embed your socials to your documentation. Docufy supports
              three for now.
            </p>
            <div className="flex flex-col gap-2">
              {data.socials.map((social) => (
                <div key={social.platform} className="flex items-center gap-5">
                  {socialsIcons[social.platform]}
                  <Input
                    value={social.href}
                    placeholder={`Enter ${social.platform} link`}
                    onChange={(e) =>
                      updateSocial(social.platform, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* theme toggle */}
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-4">
              <Label>Theme Toggle</Label>
              <Switch
                id="theme-toggle"
                checked={data.theme_toggle}
                onCheckedChange={() => toggleThemeToggle()}
                className="hover:cursor-pointer"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              You can choose to enable theme toggle for your documentation.
            </p>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-between">
        <Link href="/">
          <Button
            variant={"ghost"}
            className="hover:cursor-pointer"
            size={"sm"}
          >
            <ChevronLeft />
            Go Back
          </Button>
        </Link>
        <ThemeToggleClick />
      </CardFooter>
    </Card>
  );
};

export default EditorSidebar;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEditorStore } from "@/stores/editor-store";
import { Facebook, Github, Plus, Twitter, X } from "lucide-react";

const socialsIcons = {
  github: <Github />,
  facebook: <Facebook />,
  twitter: <Twitter />,
};

const EditorHeader = () => {
  const {
    data,
    updateField,
    addNavLink,
    updateNavLink,
    removeNavLink,
    toggleThemeToggle,
    updateSocial,
  } = useEditorStore();

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <p className="text-xs text-muted-foreground">
          Here you can edit the sidebar for you documentation. Your header is
          located at the <span className="underline font-bold">top</span> and
          contains the title, links, and other necessities that you want to be
          easily accessible.
        </p>
      </div>

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
                onChange={(e) => updateSocial(social.platform, e.target.value)}
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
  );
};

export default EditorHeader;

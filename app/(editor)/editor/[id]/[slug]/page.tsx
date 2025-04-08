import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { Github, Twitter, Facebook } from "lucide-react";

const EditorPage = () => {
  const data = {
    headerLeft: {
      title: "shadcn/ui",
      navlinks: [
        {
          title: "Docs",
          link: "/installation",
        },
        {
          title: "Components",
          link: "/docs/components",
        },
        {
          title: "Blocks",
          link: "/blocks",
        },
        {
          title: "Charts",
          link: "/charts",
        },
        {
          title: "Themes",
          link: "/themes",
        },
        {
          title: "Colors",
          link: "/colors",
        },
      ],
    },
    headerRight: {
      github: {
        enabled: true,
        link: "https://github.com/shadcn-ui/ui",
        icon: <Github className="w-4 h-4" />,
      },
      twitter: {
        enabled: false,
        link: "",
        icon: <Twitter className="w-4 h-4" />,
      },
      facebook: {
        enabled: false,
        link: "",
        icon: <Facebook className="w-4 h-4" />,
      },
      themeToggle: true,
    },
  };

  return (
    <div className="">
      {/* editor navbar */}
      <div className="h-16 border-b border-muted-foreground/20 flex items-center justify-between px-4">
        <Link href="/">
          <Button
            variant={"outline"}
            size={"sm"}
            className="px-2 py-0 text-[10px] hover:cursor-pointer h-6"
          >
            <ChevronLeft className="!h-[10px] !w-[10px]" />
            Go Back
          </Button>
        </Link>
        <div className="w-full container flex items-center justify-between h-full">
          <div className="border-r border-muted-foreground/20 h-full flex items-center justify-center" />
          <div className="h-full w-full flex items-center justify-between px-6 gap-x-4">
            <div className="flex items-center justify-center gap-x-4">
              <p className="text-base font-bold">{data.headerLeft.title}</p>
              {data.headerLeft.navlinks.map((item) => (
                <Link
                  href={item.link}
                  className="text-sm text-muted-foreground"
                  key={item.title}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-center gap-x-4">
              {data.headerRight.github.enabled && (
                <Link
                  href={data.headerRight.github.link}
                  className="text-sm flex items-center justify-center"
                  target="_blank"
                >
                  <Button variant={"ghost"} className="hover:cursor-pointer">
                    {data.headerRight.github.icon}
                  </Button>
                </Link>
              )}

              {data.headerRight.themeToggle && (
                <div>
                  <ThemeToggle />
                </div>
              )}
            </div>
          </div>
          <div className="border-l border-muted-foreground/20 h-full flex items-center justify-center" />
        </div>
        <Button
          variant={"default"}
          size={"sm"}
          className="px-2 py-0 text-[10px] hover:cursor-pointer h-6"
        >
          <Save className="!h-[10px] !w-[10px]" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditorPage;

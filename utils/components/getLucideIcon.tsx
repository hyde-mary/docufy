import * as LucideIcons from "lucide-react";

const fallbackIcon = <LucideIcons.File size={16} />;

type LucideIconType = React.ComponentType<{
  size?: number;
  className?: string;
}>;

type LucideIconsType = {
  [key: string]: LucideIconType;
} & typeof LucideIcons;

export const getLucideIcon = (iconName: string | undefined) => {
  if (!iconName) return fallbackIcon;

  const icons = LucideIcons as LucideIconsType;
  const IconComponent = icons[iconName];

  return IconComponent ? <IconComponent size={16} /> : fallbackIcon;
};

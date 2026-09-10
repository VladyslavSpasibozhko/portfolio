import { Icon } from "@components/atoms/Icon";

interface IconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  icon: React.ComponentProps<typeof Icon>["name"];
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  "aria-label": string;
}

const variantClasses = {
  primary:
    "rounded-lg cursor-pointer border border-border-highlight text-text-blue hover:border-border-focus hover:text-accent-sky",
  secondary:
    "rounded-lg cursor-pointer border border-border-strong text-text-200 hover:border-border-DEFAULT hover:text-text-300",
  ghost: "rounded-lg cursor-pointer text-text-blue hover:text-accent-sky",
};

const sizeClasses = {
  sm: { button: "p-1", icon: "sm" },
  md: { button: "p-2", icon: "md" },
  lg: { button: "p-3", icon: "lg" },
  xl: { button: "p-3", icon: "xl" },
  "2xl": { button: "p-4", icon: "2xl" },
  "3xl": { button: "p-4", icon: "3xl" },
  "4xl": { button: "p-5", icon: "4xl" },
  "5xl": { button: "p-5", icon: "5xl" },
} as const;

export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center ${variantClasses[variant]} ${sizeClasses[size].button} ${className}`}
      {...props}
    >
      <Icon name={icon} size={sizeClasses[size].icon} />
    </button>
  );
}

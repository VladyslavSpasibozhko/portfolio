import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkVariant = "default" | "inline";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  children: ReactNode;
}

const BASE_CLASSES =
  "font-sans text-16 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-text-accent)";

const VARIANT_CLASSES: Record<LinkVariant, string> = {
  default: "text-text-primary no-underline hover:text-text-accent hover:underline",
  inline: "text-text-accent underline underline-offset-4",
};

const isExternal = (href?: string) => href?.startsWith("http") ?? false;

export function Link({
  variant = "default",
  href,
  className = "",
  children,
  ...props
}: LinkProps) {
  const externalProps = isExternal(href)
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <a
      href={href}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`}
      {...externalProps}
      {...props}
    >
      {children}
    </a>
  );
}

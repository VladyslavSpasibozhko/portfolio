import type { FC, SVGProps } from 'react';

// Add the filename (without .svg) here whenever a new icon is dropped into src/icons/.
export type IconName =
  | 'ai-chat'
  | 'angular'
  | 'arrow-right'
  | 'arrow-right-circle'
  | 'badge'
  | 'bar-chart-trend'
  | 'bookmark'
  | 'calendar-cursor'
  | 'camera'
  | 'chevron-down'
  | 'clipboard-check'
  | 'clock'
  | 'close'
  | 'code'
  | 'cypress'
  | 'database'
  | 'driver-face'
  | 'education'
  | 'external-link'
  | 'feature-flag'
  | 'github'
  | 'graphql'
  | 'info'
  | 'javascript'
  | 'layers'
  | 'linkedin'
  | 'lock-module'
  | 'mail'
  | 'menu'
  | 'mobx'
  | 'modular-book'
  | 'nextjs'
  | 'nodejs'
  | 'postgresql'
  | 'react'
  | 'redux'
  | 'send'
  | 'settings'
  | 'shield'
  | 'shield-heart'
  | 'terminal'
  | 'ticket-check'
  | 'typescript'
  | 'user';

interface IconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  className?: string;
  /**
   * Icons sit next to text that already says what they mean, so they're
   * hidden from assistive tech by default. Pass `false` for an icon that
   * stands alone — it's then announced by the label inside its SVG file.
   */
  decorative?: boolean;
}

const sizeClasses = {
  sm: "w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20",
  md: "w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24",
  lg: "w-20 h-20 md:w-24 md:h-24 xl:w-28 xl:h-28",
  xl: "w-24 h-24 md:w-28 md:h-28 xl:w-32 xl:h-32",
  "2xl": "w-28 h-28 md:w-32 md:h-32 xl:w-36 xl:h-36",
  "3xl": "w-32 h-32 md:w-36 md:h-36 xl:w-40 xl:h-40",
  "4xl": "w-36 h-36 md:w-40 md:h-40 xl:w-44 xl:h-44",
  "5xl": "w-40 h-40 md:w-44 md:h-44 xl:w-48 xl:h-48",
};

type SvgComponent = FC<SVGProps<SVGSVGElement>>;

const iconModules = import.meta.glob<SvgComponent>('./icons/*.svg', {
  eager: true,
  query: '?react',
  import: 'default',
});

const iconRegistry = Object.fromEntries(
  Object.entries(iconModules).map(([path, Component]) => [
    path.replace(/^.*\/([^/]+)\.svg$/, '$1'),
    Component,
  ])
) as Record<IconName, SvgComponent>;

// Icon names coming from data files (e.g. data/journey.json) are plain
// strings, so they have to be narrowed against what the registry actually
// holds before they can be handed to `Icon`.
export function isIconName(value: string | undefined): value is IconName {
  return !!value && value in iconRegistry;
}

export function Icon({ name, size = 'md', className = '', decorative = true }: IconProps) {
  const SvgIcon = iconRegistry[name];

  if (!SvgIcon) return null;

  return (
    <SvgIcon
      className={`${sizeClasses[size]} ${className}`}
      aria-hidden={decorative || undefined}
      focusable={decorative ? 'false' : undefined}
    />
  );
}

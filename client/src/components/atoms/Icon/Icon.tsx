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
  | 'nodejs'
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
}

const sizeClasses = {
  sm: "w-20 h-20",
  md: "w-24 h-24",
  lg: "w-28 h-28",
  xl: "w-32 h-32",
  "2xl": "w-36 h-36",
  "3xl": "w-40 h-40",
  "4xl": "w-44 h-44",
  "5xl": "w-48 h-48",
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

export function Icon({ name, size = 'md', className = '' }: IconProps) {
  const SvgIcon = iconRegistry[name];

  if (!SvgIcon) return null;

  return <SvgIcon className={`${sizeClasses[size]} ${className}`} />;
}

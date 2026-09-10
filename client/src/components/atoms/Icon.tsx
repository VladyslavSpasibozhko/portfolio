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
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
  '3xl': 'w-12 h-12',
  '4xl': 'w-14 h-14',
  '5xl': 'w-16 h-16',
};

type SvgComponent = FC<SVGProps<SVGSVGElement>>;

const iconModules = import.meta.glob<SvgComponent>('../../icons/*.svg', {
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

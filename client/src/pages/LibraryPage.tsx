import { useState } from "react";
import { Badge } from "@components/atoms/Badge";
import { Button } from "@components/atoms/Button";
import { Icon, type IconName } from "@components/atoms/Icon";
import { Link } from "@components/atoms/Link";
import { Textarea } from "@components/atoms/Textarea";
import { Tooltip } from "@components/atoms/Tooltip";
import { Typography } from "@components/atoms/Typography";
import { EmptyState } from "@components/molecules/EmptyState";
import { IconButton } from "@components/molecules/IconButton";
import { Markdown } from "@components/molecules/Markdown";
import { Modal } from "@components/molecules/Modal";

const ICON_NAMES: IconName[] = [
  "ai-chat",
  "angular",
  "arrow-right",
  "arrow-right-circle",
  "badge",
  "bar-chart-trend",
  "bookmark",
  "calendar-cursor",
  "camera",
  "chevron-down",
  "clipboard-check",
  "clock",
  "close",
  "code",
  "cypress",
  "database",
  "driver-face",
  "education",
  "external-link",
  "feature-flag",
  "graphql",
  "info",
  "javascript",
  "layers",
  "linkedin",
  "lock-module",
  "mail",
  "menu",
  "mobx",
  "modular-book",
  "nodejs",
  "react",
  "redux",
  "send",
  "settings",
  "shield",
  "shield-heart",
  "terminal",
  "ticket-check",
  "typescript",
  "user",
];

const ICON_SIZES = [
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
] as const;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <Typography tag="h2" className="mb-6 pb-2 border-b border-white/10">
        {title}
      </Typography>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

function ColorSwatch({
  label,
  value,
  className,
  kind = "bg",
}: {
  label: string;
  value: string;
  className: string;
  kind?: "bg" | "text" | "border";
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      {kind === "bg" && (
        <div
          className={`w-full h-14 rounded-lg border border-white/10 ${className}`}
        />
      )}
      {kind === "text" && (
        <div className="w-full h-14 rounded-lg border border-white/10 bg-background-950 flex items-center justify-center">
          <span className={`text-18 font-semibold ${className}`}>Aa</span>
        </div>
      )}
      {kind === "border" && (
        <div
          className={`w-full h-14 rounded-lg bg-background-950 border-4 ${className}`}
        />
      )}
      <div>
        <Typography tag="small" className="block leading-tight text-gray-300">
          {label}
        </Typography>
        <Typography tag="small" className="block leading-tight text-gray-600">
          {value}
        </Typography>
      </div>
    </div>
  );
}

function Example({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Typography tag="small" className="block mb-2 uppercase tracking-wide">
        {label}
      </Typography>
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
        {children}
      </div>
    </div>
  );
}

export function LibraryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative z-10  mx-auto px-6 py-16 bg-background-950">
      <Typography tag="h1" className="mb-2">
        Component Library
      </Typography>
      <Typography tag="p" className="mb-12 ">
        Every component with its prop variations, for quick visual reference.
      </Typography>

      <Section title="Colors">
        <Example label="Text scale (--color-text-*)">
          <ColorSwatch
            kind="text"
            label="text-white"
            value="#f8fafc"
            className="text-text-white"
          />
          <ColorSwatch
            kind="text"
            label="text-danger"
            value="#ff5256"
            className="text-text-danger"
          />
          <ColorSwatch
            kind="text"
            label="text-100"
            value="#f8fafc"
            className="text-text-100"
          />
          <ColorSwatch
            kind="text"
            label="text-200"
            value="#e2e8f0"
            className="text-text-200"
          />
          <ColorSwatch
            kind="text"
            label="text-300"
            value="#cbd5e1"
            className="text-text-300"
          />
          <ColorSwatch
            kind="text"
            label="text-400"
            value="#64748b"
            className="text-text-400"
          />
          <ColorSwatch
            kind="text"
            label="text-500"
            value="#475569"
            className="text-text-500"
          />
          <ColorSwatch
            kind="text"
            label="text-600"
            value="#334155"
            className="text-text-600"
          />
          <ColorSwatch
            kind="text"
            label="text-blue"
            value="#7ab6ff"
            className="text-text-blue"
          />
          <ColorSwatch
            kind="text"
            label="text-sky"
            value="#a7e4ff"
            className="text-text-sky"
          />
        </Example>

        <Example label="Background scale (--color-background-*)">
          <ColorSwatch
            label="background-950"
            value="#081125"
            className="bg-background-950"
          />
          <ColorSwatch
            label="background-900"
            value="#0b152b"
            className="bg-background-900"
          />
          <ColorSwatch
            label="background-850"
            value="#0e1a31"
            className="bg-background-850"
          />
          <ColorSwatch
            label="background-800"
            value="#111e37"
            className="bg-background-800"
          />
          <ColorSwatch
            label="background-700"
            value="#172542"
            className="bg-background-700"
          />
          <ColorSwatch
            label="background-glass"
            value="rgba(8,13,22,.72)"
            className="bg-background-glass"
          />
          <ColorSwatch
            label="background-glassStrong"
            value="rgba(5,8,16,.88)"
            className="bg-background-glassStrong"
          />
        </Example>

        <Example label="Border scale (--color-border-*)">
          <ColorSwatch
            kind="border"
            label="border-subtle"
            value="#172033"
            className="border-border-subtle"
          />
          <ColorSwatch
            kind="border"
            label="border-DEFAULT"
            value="#263247"
            className="border-border"
          />
          <ColorSwatch
            kind="border"
            label="border-strong"
            value="#3a4963"
            className="border-border-strong"
          />
          <ColorSwatch
            kind="border"
            label="border-focus"
            value="#017db4"
            className="border-border-focus"
          />
          <ColorSwatch
            kind="border"
            label="border-highlight"
            value="#015e87"
            className="border-border-highlight"
          />
        </Example>

        <Example label="Accent (--color-accent-*)">
          <ColorSwatch
            label="accent-cyan"
            value="#22d3ee"
            className="bg-accent-cyan"
          />
          <ColorSwatch
            label="accent-blue"
            value="#60a5fa"
            className="bg-accent-blue"
          />
          <ColorSwatch
            label="accent-violet"
            value="#8b5cf6"
            className="bg-accent-violet"
          />
          <ColorSwatch
            label="accent-green"
            value="#34d399"
            className="bg-accent-green"
          />
          <ColorSwatch
            label="accent-sky"
            value="#0d95d1"
            className="bg-accent-sky"
          />
        </Example>

        <Example label="Status colors (bg / text)">
          <ColorSwatch
            label="background-error"
            value="#82181a"
            className="bg-background-error"
          />
          <ColorSwatch
            kind="text"
            label="text-danger"
            value="#ff5256"
            className="text-text-danger"
          />
        </Example>
      </Section>

      <Section title="Typography">
        <Example label="Tags">
          <div className="flex flex-col gap-2">
            <Typography tag="h1">Heading 1</Typography>
            <Typography tag="h2">Heading 2</Typography>
            <Typography tag="h3">Heading 3</Typography>
            <Typography tag="h4">Heading 4</Typography>
            <Typography tag="p">Paragraph text</Typography>
            <Typography tag="span">Span text</Typography>
            <Typography tag="small">Small text</Typography>
          </div>
        </Example>
      </Section>

      <Section title="Button">
        <Example label="Variants">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="inline">Inline</Button>
        </Example>
        <Example label="Sizes">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Example>
        <Example label="Disabled">
          <Button disabled>Disabled</Button>
        </Example>
      </Section>

      <Section title="IconButton">
        <Example label="Variants">
          <IconButton icon="settings" variant="primary" aria-label="Settings" />
          <IconButton
            icon="settings"
            variant="secondary"
            aria-label="Settings"
          />
          <IconButton icon="settings" variant="ghost" aria-label="Settings" />
        </Example>
        <Example label="Sizes">
          {(["sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
            <IconButton
              key={size}
              icon="mail"
              size={size}
              aria-label={`Mail ${size}`}
            />
          ))}
        </Example>
      </Section>

      <Section title="Badge">
        <Example label="Variants">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
        </Example>
      </Section>

      <Section title="Icon">
        <Example label="Sizes">
          {ICON_SIZES.map((size) => (
            <Icon key={size} name="react" size={size} />
          ))}
        </Example>
        <Example label="All icons">
          {ICON_NAMES.map((name) => (
            <Tooltip key={name} content={name}>
              <Icon name={name} size="lg" />
            </Tooltip>
          ))}
        </Example>
      </Section>

      <Section title="Tooltip">
        <Example label="Sides">
          <Tooltip content="Top tooltip" side="top">
            <Button variant="secondary">Top</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" side="bottom">
            <Button variant="secondary">Bottom</Button>
          </Tooltip>
          <Tooltip content="Left tooltip" side="left">
            <Button variant="secondary">Left</Button>
          </Tooltip>
          <Tooltip content="Right tooltip" side="right">
            <Button variant="secondary">Right</Button>
          </Tooltip>
        </Example>
      </Section>

      <Section title="Link">
        <Example label="Default">
          <Link href="#">Inline link</Link>
          <Link href="#" target="_blank" rel="noopener noreferrer">
            External link
          </Link>
        </Example>
      </Section>

      <Section title="Textarea">
        <Example label="Default / auto-resize / disabled">
          <Textarea placeholder="Type something..." rows={2} />
          <Textarea placeholder="Auto-resize" autoResize maxHeight={500} />
          <Textarea placeholder="Disabled" disabled />
        </Example>
      </Section>

      <Section title="EmptyState">
        <Example label="Default">
          <div className="h-24 w-full">
            <EmptyState>Nothing to show yet</EmptyState>
          </div>
        </Example>
      </Section>

      <Section title="Markdown">
        <Example label="Default">
          <div className="w-full">
            <Markdown
              content={
                "**Bold**, _italic_, a [link](#), and a list:\n\n- one\n- two\n- three"
              }
            />
          </div>
        </Example>
      </Section>

      <Section title="Modal">
        <Example label="Default">
          <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example modal"
            size="md"
          >
            <Typography tag="p">This is example modal content.</Typography>
          </Modal>
        </Example>
      </Section>
    </div>
  );
}

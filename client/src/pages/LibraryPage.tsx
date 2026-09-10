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
    <div className="relative z-10  mx-auto px-6 py-16 bg-background-700">
      <Typography tag="h1" className="mb-2">
        Component Library
      </Typography>
      <Typography tag="p" className="mb-12 text-gray-400">
        Every component with its prop variations, for quick visual reference.
      </Typography>

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
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
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

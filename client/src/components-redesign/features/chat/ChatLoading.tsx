import type { CSSProperties } from "react";
import { translate } from "@lib/i18n";

const DOT_DELAYS = [0, 150, 300];

export function ChatLoading() {
  return (
    <div
      role="status"
      aria-label={translate("chat.loading.label")}
      className="self-start flex items-center gap-4 px-12 py-12 rounded-8 bg-bg-assistantBubble text-text-muted"
    >
      {DOT_DELAYS.map((delay) => (
        <span
          key={delay}
          aria-hidden="true"
          className="size-4 rounded-pill bg-current animate-chat-dot"
          style={{ "--chat-dot-delay": `${delay}ms` } as CSSProperties}
        />
      ))}
    </div>
  );
}

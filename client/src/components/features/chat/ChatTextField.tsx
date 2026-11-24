import type { FormEvent, KeyboardEvent } from "react";
import { Button } from "@components/atoms/Button";
import { Textarea } from "@components/atoms/Textarea";
import { translate } from "@lib/i18n";

interface ChatTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const isSubmitKey = (event: KeyboardEvent<HTMLTextAreaElement>) =>
  event.key === "Enter" && !event.shiftKey;

export function ChatTextField({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = translate("chat.input.placeholder_experience"),
}: ChatTextFieldProps) {
  const canSubmit = !disabled && value.trim().length > 0;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isSubmitKey(event)) return;
    handleSubmit(event);
  };

  return (
    <form className="flex items-end gap-8" onSubmit={handleSubmit}>
      <Textarea
        variant="singleLine"
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button type="submit" disabled={disabled} aria-label={translate("chat.input.send")}>
        {translate("chat.input.send_short")}
      </Button>
    </form>
  );
}

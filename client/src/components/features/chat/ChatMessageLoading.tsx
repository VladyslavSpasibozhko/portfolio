import { useEffect, useState } from "react";
import { interval } from "@utils/interval";
import { timeout } from "@utils/timeout";
import { Typography } from "@components/atoms/Typography";
import { translate } from "@lib/i18n";

const ACTION_KEYS = [
  "chat.loading.typing",
  "chat.loading.thinking",
  "chat.loading.syncing",
  "chat.loading.searching",
  "chat.loading.fetching",
];

const ACTIONS = ACTION_KEYS.map((key) => translate(key));

const TYPING_SPEED = 80;
const HOLD_DURATION = 300;

interface ChatMessageLoadingProps {
  className?: string;
}

export function ChatMessageLoading({ className }: ChatMessageLoadingProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const word = ACTIONS[wordIndex];
  const isWordComplete = charIndex >= word.length;

  const handleChangeLetter = () => {
    setCharIndex((prev) => prev + 1);
  };

  const handleChangeWord = () => {
    setCharIndex(1);
    setWordIndex((prev) => (prev + 1) % ACTIONS.length);
  };

  useEffect(() => {
    const cancel = interval({
      delay: TYPING_SPEED,
      callback: handleChangeLetter,
    });

    return cancel;
  }, [wordIndex]);

  useEffect(() => {
    if (!isWordComplete) return;

    const cancel = timeout({
      delay: HOLD_DURATION,
      callback: handleChangeWord,
    });

    return cancel;
  }, [isWordComplete]);

  const text = word.slice(0, charIndex);

  return (
    <div
      className={`px-16 rounded-lg flex justify-center items-center space-x-8 ${className}`}
    >
      <Typography>{text}</Typography>
    </div>
  );
}

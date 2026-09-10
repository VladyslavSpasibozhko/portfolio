import { useEffect, useState } from "react";
import { interval } from "@utils/interval";
import { timeout } from "@utils/timeout";
import { Typography } from "@components/atoms/Typography";

const ACTIONS = [
  "Typing...",
  "Thinking...",
  "Syncing...",
  "Searching...",
  "Fetching...",
];

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
      className={`px-4 rounded-lg flex justify-center items-center space-x-2 ${className}`}
    >
      <Typography>{text}</Typography>
    </div>
  );
}

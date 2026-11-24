import { useEffect, useState } from "react";
import type { StreamEmitter } from "../utils/streamEmitter";

// TODO: remove;
export function useStreamContent(streamEmitter: StreamEmitter): string {
  const [content, setContent] = useState(streamEmitter.content);

  useEffect(
    () => streamEmitter.subscribe(() => setContent(streamEmitter.content)),
    [streamEmitter],
  );

  return content;
}

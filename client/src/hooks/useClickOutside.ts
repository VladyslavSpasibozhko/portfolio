import { useEffect, type RefObject } from "react";

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onClickOutside: () => void,
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) return;
      onClickOutside();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClickOutside();
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, onClickOutside]);
}

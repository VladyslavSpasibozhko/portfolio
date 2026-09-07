import { useEffect } from "react";

export function useClickOutside(
  element: HTMLElement | null,
  onClickOutside: () => void,
) {
  useEffect(() => {
    if (!element) return;

    const handleClick = (event: MouseEvent) => {
      if (element.contains(event.target as Node)) return;
      onClickOutside();
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [element, onClickOutside]);
}

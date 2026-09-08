import { useEffect, type RefObject } from 'react';

interface UseIntersectionObserverProps {
  ref: RefObject<HTMLElement | null>;
  threshold?: number;
  onIntersect: (isIntersecting: boolean) => void;
}

export function useIntersectionObserver({ ref, onIntersect, threshold = 0.2 }: UseIntersectionObserverProps) {

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onIntersect(entry.isIntersecting)
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);
}

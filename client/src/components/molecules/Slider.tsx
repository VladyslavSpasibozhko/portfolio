import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { useRef, useState } from "react";

export interface Slide {
  id: string;
  content: React.ReactNode;
}

interface SliderProps {
  className?: string;
  slides: Slide[];
}

interface SlideProps extends React.PropsWithChildren, Slide {
  className?: string;
  onAppear: (id: Slide["id"]) => void;
}

function Slide({ id, content, className = '', onAppear }: SlideProps) {
  const ref = useRef<HTMLElement | null>(null);
  useIntersectionObserver({
    ref,
    threshold: 0.5,
    onIntersect: (isIntersecting) => {
      if (isIntersecting) onAppear(id);
    },
  });

  return (
    <div
      ref={ref}
      className={`h-screen w-full transition-all duration-700 ease-out ${className}`}
    >
      {content}
    </div>
  );
}

export function Slider({ slides, className = "" }: SliderProps) {
  const [visible, setVisible] = useState<Slide["id"] | null>(null);

  return (
    <div className={className}>
      {slides.map((slide) => (
        <Slide
          key={slide.id}
          id={slide.id}
          content={slide.content}
          className={visible === slide.id ? "opacity-100" : "opacity-0"}
          onAppear={setVisible}
        />
      ))}
    </div>
  );
}

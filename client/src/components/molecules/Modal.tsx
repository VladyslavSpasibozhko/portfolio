import { useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "@hooks/useClickOutside";
import { IconButton } from "@components/molecules/IconButton";
import { Typography } from "@components/atoms/Typography";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  size?: keyof typeof sizeClasses;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark-950/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative bg-dark-950 border rounded-2xl shadow-2xl ${sizeClasses[size]} w-full mx-4`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <Typography tag="h2" className="text-2xl">{title}</Typography>
          <IconButton
            icon="close"
            variant="ghost"
            size="md"
            onClick={onClose}
            aria-label="Close modal"
          />
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

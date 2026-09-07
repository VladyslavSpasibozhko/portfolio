import { useState, type ReactNode } from 'react';
import { Icon } from '../atoms/Icon';

interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-900 transition-colors"
      >
        <span className="font-medium text-white">{title}</span>
        <Icon
          name="chevron-down"
          size="md"
          className={`transition-transform text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && <div className="px-4 py-4 bg-gray-900">{children}</div>}
    </div>
  );
}

interface AccordionProps {
  items: Array<{
    title: ReactNode;
    content: ReactNode;
    defaultOpen?: boolean;
  }>;
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-950">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          defaultOpen={item.defaultOpen}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

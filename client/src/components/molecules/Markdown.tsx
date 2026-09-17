import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Typography } from "@components/atoms/Typography";
import { Link } from "@components/atoms/Link";

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <div className="text-16 leading-relaxed space-y-12 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <Typography tag="p" className="mb-12">
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-20 mb-12 space-y-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-20 mb-12 space-y-4">{children}</ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          a: ({ children, href }) => (
            <Link href={href} target="_blank" rel="noopener noreferrer" className="underline">
              {children}
            </Link>
          ),
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          h1: ({ children }) => (
            <Typography tag="h4" className="mb-8">
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography tag="h4" className="mb-8">
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography tag="h4" className="mb-8">
              {children}
            </Typography>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 pl-12 italic">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = /language-/.test(className || "");
            if (isBlock) {
              return (
                <code
                  className={`block border rounded-md p-12 overflow-x-auto text-14 font-mono ${className ?? ""}`}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className="border rounded px-4 py-2 text-14 font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="mb-12 overflow-x-auto">{children}</pre>,
          hr: () => <hr className="my-12" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

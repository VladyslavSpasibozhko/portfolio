import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Typography } from "@components/atoms/Typography";
import { Link } from "@components/atoms/Link";

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <div className="text-base text-gray-100 leading-relaxed space-y-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <Typography tag="p" className="mb-3 text-gray-100">
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-5 mb-3 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-5 mb-3 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          a: ({ children, href }) => (
            <Link href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
              {children}
            </Link>
          ),
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          h1: ({ children }) => (
            <Typography tag="h4" className="mb-2">
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography tag="h4" className="mb-2">
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography tag="h4" className="mb-2">
              {children}
            </Typography>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-white/20 pl-3 text-gray-300 italic">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = /language-/.test(className || "");
            if (isBlock) {
              return (
                <code
                  className={`block bg-black/40 border border-white/10 rounded-md p-3 overflow-x-auto text-sm font-mono text-gray-100 ${className ?? ""}`}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className="bg-black/40 border border-white/10 rounded px-1 py-0.5 text-sm font-mono text-gray-100"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="mb-3 overflow-x-auto">{children}</pre>,
          hr: () => <hr className="border-white/10 my-3" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

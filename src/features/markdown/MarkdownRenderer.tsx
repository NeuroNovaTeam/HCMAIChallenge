import React from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import "./MarkdownRenderer.scss"

interface MarkdownRendererProps {
  content: string
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="markdown-renderer">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="code-block"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="inline-code" {...props}>
                {children}
              </code>
            )
          },
          p({ children }) {
            return <p className="markdown-paragraph">{children}</p>
          },
          h1({ children }) {
            return <h1 className="markdown-heading markdown-h1">{children}</h1>
          },
          h2({ children }) {
            return <h2 className="markdown-heading markdown-h2">{children}</h2>
          },
          h3({ children }) {
            return <h3 className="markdown-heading markdown-h3">{children}</h3>
          },
          h4({ children }) {
            return <h4 className="markdown-heading markdown-h4">{children}</h4>
          },
          h5({ children }) {
            return <h5 className="markdown-heading markdown-h5">{children}</h5>
          },
          h6({ children }) {
            return <h6 className="markdown-heading markdown-h6">{children}</h6>
          },
          ul({ children }) {
            return <ul className="markdown-list markdown-ul">{children}</ul>
          },
          ol({ children }) {
            return <ol className="markdown-list markdown-ol">{children}</ol>
          },
          li({ children }) {
            return <li className="markdown-list-item">{children}</li>
          },
          blockquote({ children }) {
            return <blockquote className="markdown-blockquote">{children}</blockquote>
          },
          a({ href, children }) {
            return (
              <a href={href} className="markdown-link" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            )
          },
          strong({ children }) {
            return <strong className="markdown-strong">{children}</strong>
          },
          em({ children }) {
            return <em className="markdown-em">{children}</em>
          },
          hr() {
            return <hr className="markdown-hr" />
          },
          table({ children }) {
            return <table className="markdown-table">{children}</table>
          },
          th({ children }) {
            return <th className="markdown-th">{children}</th>
          },
          td({ children }) {
            return <td className="markdown-td">{children}</td>
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
} 
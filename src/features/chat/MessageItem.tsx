import React from "react"
import { observer } from "mobx-react-lite"
import { Message } from "../../types"
import { MarkdownRenderer } from "../markdown/MarkdownRenderer"
import "./MessageItem.scss"

interface MessageItemProps {
  message: Message
}

export const MessageItem: React.FC<MessageItemProps> = observer(({ message }) => {
  const isUser = message.role === "user"
  const isGenerating = message.isGenerating

  return (
    <div className={`message-item ${isUser ? "user" : "assistant"}`}>
      <div className="message-avatar">
        {isUser ? "👤" : "🤖"}
      </div>
      
      <div className="message-content">
        <div className="message-header">
          <span className="message-role">
            {isUser ? "You" : "AI Assistant"}
          </span>
          <span className="message-time">
            {message.timestamp.toLocaleTimeString([], { 
              hour: "2-digit", 
              minute: "2-digit" 
            })}
          </span>
        </div>
        
        <div className="message-text">
          {isGenerating ? (
            <div className="generating-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>
      </div>
    </div>
  )
}) 
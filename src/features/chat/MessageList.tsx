import React, { useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { MessageItem } from "./MessageItem"
import { Conversation } from "../../types"
import "./MessageList.scss"

interface MessageListProps {
  conversation: Conversation
}

export const MessageList: React.FC<MessageListProps> = observer(({ conversation }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation.messages])

  if (conversation.messages.length === 0) {
    return (
      <div className="message-list empty">
        <div className="empty-message">
          <div className="empty-icon">💬</div>
          <h3>Start a new conversation</h3>
          <p>Type a message below to begin chatting with your AI assistant.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="message-list">
      {conversation.messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}) 
import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../hooks/useStore"
import { MessageList } from "./MessageList"
import { ChatInput } from "./ChatInput"
import { EmptyState } from "./EmptyState"
import "./ChatArea.scss"

export const ChatArea: React.FC = observer(() => {
  const { conversationStore } = useStore()
  const currentConversation = conversationStore.currentConversation

  if (!currentConversation) {
    return <EmptyState />
  }

  return (
    <div className="chat-area">
      <MessageList conversation={currentConversation} />
      <ChatInput />
    </div>
  )
}) 
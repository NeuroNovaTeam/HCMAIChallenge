import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../hooks/useStore"
import { ConversationItem } from "./ConversationItem"
import "./ConversationList.scss"

export const ConversationList: React.FC = observer(() => {
  const { conversationStore, sidebarStore } = useStore()
  const { conversations, currentConversationId } = conversationStore
  const { isCollapsed } = sidebarStore

  if (conversations.length === 0) {
    return (
      <div className="conversation-list empty">
        <div className="empty-conversations">
          <div className="empty-icon">💬</div>
          <p className="empty-text">No conversations yet</p>
          <p className="empty-subtext">Start a new chat to begin</p>
        </div>
      </div>
    )
  }

  return (
    <div className="conversation-list">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === currentConversationId}
          isCollapsed={isCollapsed}
        />
      ))}
    </div>
  )
}) 
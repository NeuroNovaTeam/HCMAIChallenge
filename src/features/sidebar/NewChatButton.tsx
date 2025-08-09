import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../hooks/useStore"
import "./NewChatButton.scss"

export const NewChatButton: React.FC = observer(() => {
  const { conversationStore, sidebarStore } = useStore()
  const { isCollapsed } = sidebarStore

  const handleNewChat = () => {
    conversationStore.createNewConversation()
    
    // Close mobile sidebar on mobile
    if (window.innerWidth <= 768) {
      sidebarStore.closeMobileSidebar()
    }
  }

  return (
    <div className="new-chat-container">
      <button
        className="new-chat-button"
        onClick={handleNewChat}
        title="Start new chat"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="new-chat-icon">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        {!isCollapsed && (
          <span className="new-chat-text">New Chat</span>
        )}
      </button>
    </div>
  )
}) 
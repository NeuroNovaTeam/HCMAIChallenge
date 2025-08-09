import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../hooks/useStore"
import { Conversation } from "../../types"
import "./ConversationItem.scss"

interface ConversationItemProps {
  conversation: Conversation
  isActive: boolean
  isCollapsed: boolean
}

export const ConversationItem: React.FC<ConversationItemProps> = observer(({
  conversation,
  isActive,
  isCollapsed
}) => {
  const { conversationStore, sidebarStore } = useStore()

  const handleClick = () => {
    conversationStore.setCurrentConversation(conversation.id)
    
    // Close mobile sidebar on mobile
    if (window.innerWidth <= 768) {
      sidebarStore.closeMobileSidebar()
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm("Are you sure you want to delete this conversation?")) {
      conversationStore.deleteConversation(conversation.id)
    }
  }

  const formatDate = (date: Date): string => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else if (diffInHours < 168) { // 7 days
      return `${Math.floor(diffInHours / 24)}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getPreviewText = (): string => {
    if (conversation.messages.length === 0) return "No messages yet"
    
    const lastMessage = conversation.messages[conversation.messages.length - 1]
    const text = lastMessage.content
    
    if (text.length <= 50) return text
    return text.substring(0, 50) + "..."
  }

  return (
    <div
      className={`conversation-item ${isActive ? "active" : ""} ${isCollapsed ? "collapsed" : ""}`}
      onClick={handleClick}
    >
      <div className="conversation-content">
        <div className="conversation-icon">💬</div>
        
        {!isCollapsed && (
          <div className="conversation-details">
            <div className="conversation-header">
              <h6 className="conversation-title">
                {conversation.title || "New Chat"}
              </h6>
              <span className="conversation-time">
                {formatDate(conversation.updatedAt)}
              </span>
            </div>
            
            <p className="conversation-preview">
              {getPreviewText()}
            </p>
            
            <div className="conversation-meta">
              <span className="message-count">
                {conversation.messages.length} message{conversation.messages.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {!isCollapsed && (
        <button
          className="delete-button"
          onClick={handleDelete}
          title="Delete conversation"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="delete-icon">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      )}
    </div>
  )
}) 
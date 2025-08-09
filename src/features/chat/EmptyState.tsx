import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../hooks/useStore"
import "./EmptyState.scss"

export const EmptyState: React.FC = observer(() => {
  const { conversationStore } = useStore()

  const handleStartChat = () => {
    conversationStore.createNewConversation()
  }

  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <div className="empty-state-icon">🚀</div>
        <h1 className="empty-state-title">Welcome to AI Chat</h1>
        <p className="empty-state-description">
          Start a conversation with your AI assistant. Ask questions, get help with tasks, 
          or just have a friendly chat.
        </p>
        
        <div className="empty-state-actions">
          <button 
            className="start-chat-button"
            onClick={handleStartChat}
          >
            Start New Chat
          </button>
        </div>
        
        <div className="empty-state-features">
          <div className="feature-item">
            <span className="feature-icon">💬</span>
            <span>Natural conversations</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🧠</span>
            <span>Smart responses</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <span>Mobile friendly</span>
          </div>
        </div>
      </div>
    </div>
  )
}) 
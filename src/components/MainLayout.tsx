import React from "react"
import { observer } from "mobx-react-lite"
import { Sidebar } from "../features/sidebar/Sidebar"
import { ChatArea } from "../features/chat/ChatArea"
import { useStore } from "../hooks/useStore"
import "../styles/layout.scss"

export const MainLayout: React.FC = observer(() => {
  const { sidebarStore } = useStore()

  return (
    <div className="main-layout">
      {/* Mobile overlay */}
      {sidebarStore.isMobileOpen && (
        <div 
          className="mobile-overlay"
          onClick={sidebarStore.closeMobileSidebar}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main chat area */}
      <ChatArea />
    </div>
  )
}) 
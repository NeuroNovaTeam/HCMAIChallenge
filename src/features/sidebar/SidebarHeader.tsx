import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../hooks/useStore"
import { ThemeToggle } from "../themes/ThemeToggle"
import "./SidebarHeader.scss"

export const SidebarHeader: React.FC = observer(() => {
  const { sidebarStore } = useStore()
  const { isCollapsed, toggleCollapsed } = sidebarStore

  return (
    <div className="sidebar-header">
      <div className="header-content">
        {!isCollapsed && (
          <h1 className="app-title">AI Chat</h1>
        )}
        <button
          className="collapse-button"
          onClick={toggleCollapsed}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className={`collapse-icon ${isCollapsed ? "collapsed" : ""}`}
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="header-actions">
          <ThemeToggle />
        </div>
      )}
    </div>
  )
}) 
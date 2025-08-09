import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../hooks/useStore"
import { NewChatButton } from "./NewChatButton"
import { ConversationList } from "./ConversationList"
import { SidebarHeader } from "./SidebarHeader"
import { ThemeToggle } from "../themes/ThemeToggle"
import { ExportImport } from "../export/ExportImport"
import "./Sidebar.scss"

export const Sidebar: React.FC = observer(() => {
  const { sidebarStore } = useStore()

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="btn btn-link d-md-none mobile-menu-btn"
        onClick={sidebarStore.openMobileSidebar}
        title="Toggle menu"
      >
        <i className="bi bi-list fs-4"></i>
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarStore.isCollapsed ? "collapsed" : ""} ${sidebarStore.isMobileOpen ? "mobile-open" : ""}`}>
        <SidebarHeader />
        
        <div className="sidebar-content">
          <NewChatButton />
          <ConversationList />
        </div>
        
        <div className="sidebar-footer">
          <ExportImport />
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}) 
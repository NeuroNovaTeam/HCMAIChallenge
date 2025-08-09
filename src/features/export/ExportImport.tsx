import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../hooks/useStore"


export const ExportImport: React.FC = observer(() => {
  const { conversationStore, exportStore } = useStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExportAll = () => {
    exportStore.exportAllConversations(conversationStore.conversations)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    exportStore.importConversations(file)
      .then((conversations) => {
        // Add imported conversations to the store
        conversations.forEach(conv => {
          // Check if conversation already exists
          const existingIndex = conversationStore.conversations.findIndex(c => c.id === conv.id)
          if (existingIndex !== -1) {
            // Update existing conversation
            conversationStore.conversations[existingIndex] = conv
          } else {
            // Add new conversation
            conversationStore.conversations.push(conv)
          }
        })
        
        // Clear file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        
        alert(`Successfully imported ${conversations.length} conversation(s)`)
      })
      .catch((error) => {
        alert(`Import failed: ${error.message}`)
      })
  }

  return (
    <div className="export-import">
      <div className="export-actions">
        <button
          className="btn btn-outline-primary btn-sm me-2"
          onClick={handleExportAll}
          disabled={conversationStore.conversations.length === 0}
          title="Export all conversations"
        >
          <i className="bi bi-download me-1"></i>
          Export All
        </button>
        
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => fileInputRef.current?.click()}
          title="Import conversations from file"
        >
          <i className="bi bi-upload me-1"></i>
          Import
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: "none" }}
      />
    </div>
  )
}) 
import { makeAutoObservable } from "mobx"
import { Conversation, ExportData, IRootStore } from "../types"

export class ExportStore {
  isExporting = false
  isImporting = false

  constructor(private rootStore: IRootStore) {
    makeAutoObservable(this)
  }

  exportAllConversations = async (conversations: Conversation[]) => {
    this.isExporting = true
    
    try {
      const exportData: ExportData = {
        conversations,
        exportDate: new Date(),
        version: "1.0.0"
      }

      const dataStr = JSON.stringify(exportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `ai-chat-export-${new Date().toISOString().split("T")[0]}.json`
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Export failed:", error)
      throw error
    } finally {
      this.isExporting = false
    }
  }

  importConversations = async (file: File): Promise<Conversation[]> => {
    this.isImporting = true
    
    try {
      const text = await file.text()
      const importData: ExportData = JSON.parse(text)
      
      // Validate import data
      if (!importData.conversations || !Array.isArray(importData.conversations)) {
        throw new Error("Invalid import file format")
      }
      
      // Convert date strings back to Date objects
      const conversations = importData.conversations.map(conv => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }))
      
      return conversations
    } catch (error) {
      console.error("Import failed:", error)
      throw error
    } finally {
      this.isImporting = false
    }
  }
} 
import { Conversation } from "../types"

const STORAGE_KEYS = {
  CONVERSATIONS: "ai-chat-conversations",
  THEME: "ai-chat-theme",
  SIDEBAR_STATE: "ai-chat-sidebar-state"
} as const

class LocalStorageService {
  private isAvailable(): boolean {
    try {
      const test = "__localStorage_test__"
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  // Conversations
  saveConversations(conversations: Conversation[]): void {
    if (!this.isAvailable()) return
    
    try {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations))
    } catch (error) {
      console.error("Failed to save conversations to localStorage:", error)
    }
  }

  getConversations(): Conversation[] | null {
    if (!this.isAvailable()) return null
    
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error("Failed to load conversations from localStorage:", error)
      return null
    }
  }

  // Theme
  saveTheme(theme: "light" | "dark"): void {
    if (!this.isAvailable()) return
    
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme)
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error)
    }
  }

  getTheme(): "light" | "dark" | null {
    if (!this.isAvailable()) return null
    
    try {
      const data = localStorage.getItem(STORAGE_KEYS.THEME)
      return data === "light" || data === "dark" ? data : null
    } catch (error) {
      console.error("Failed to load theme from localStorage:", error)
      return null
    }
  }

  // Sidebar State
  saveSidebarState(collapsed: boolean): void {
    if (!this.isAvailable()) return
    
    try {
      localStorage.setItem(STORAGE_KEYS.SIDEBAR_STATE, JSON.stringify(collapsed))
    } catch (error) {
      console.error("Failed to save sidebar state to localStorage:", error)
    }
  }

  getSidebarState(): boolean | null {
    if (!this.isAvailable()) return null
    
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SIDEBAR_STATE)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error("Failed to load sidebar state from localStorage:", error)
      return null
    }
  }

  // Clear all data
  clearAll(): void {
    if (!this.isAvailable()) return
    
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error("Failed to clear localStorage:", error)
    }
  }
}

export const localStorageService = new LocalStorageService() 
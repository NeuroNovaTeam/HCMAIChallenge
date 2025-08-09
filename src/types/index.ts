export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isGenerating?: boolean
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  isArchived: boolean
}

export interface UserPreferences {
  theme: "light" | "dark"
  sidebarCollapsed: boolean
}

export interface ExportData {
  conversations: Conversation[]
  exportDate: Date
  version: string
}

export interface AppState {
  currentConversationId: string | null
  conversations: Conversation[]
  userPreferences: UserPreferences
  isLoading: boolean
}

// Store Types
export interface IRootStore {
  conversationStore: IConversationStore
  themeStore: IThemeStore
  sidebarStore: ISidebarStore
  exportStore: IExportStore
}

export interface IConversationStore {
  conversations: Conversation[]
  currentConversationId: string | null
  isLoading: boolean
  currentConversation: Conversation | null
  activeConversations: Conversation[]
  archivedConversations: Conversation[]
  createNewConversation: () => void
  setCurrentConversation: (conversationId: string) => void
  addMessage: (content: string, role: "user" | "assistant") => void
  updateMessageGenerating: (messageId: string, isGenerating: boolean) => void
  regenerateResponse: () => void
  updateConversationTitle: (conversationId: string, newTitle: string) => void
  deleteConversation: (conversationId: string) => void
  archiveConversation: (conversationId: string) => void
}

export interface IThemeStore {
  currentTheme: "light" | "dark"
  toggleTheme: () => void
  setTheme: (theme: "light" | "dark") => void
}

export interface ISidebarStore {
  isCollapsed: boolean
  isMobileOpen: boolean
  toggleCollapsed: () => void
  setCollapsed: (collapsed: boolean) => void
  openMobileSidebar: () => void
  closeMobileSidebar: () => void
}

export interface IExportStore {
  isExporting: boolean
  isImporting: boolean
  exportConversations: (conversations: Conversation[]) => Promise<void>
  importConversations: (file: File) => Promise<Conversation[]>
} 
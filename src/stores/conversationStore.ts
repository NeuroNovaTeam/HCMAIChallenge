import { makeAutoObservable, runInAction } from "mobx"
import { v4 as uuidv4 } from "uuid"
import { Conversation, Message, IRootStore } from "../types"
import { localStorageService } from "../utils/localStorageService"

export class ConversationStore {
  conversations: Conversation[] = []
  currentConversationId: string | null = null
  isLoading = false

  constructor(private rootStore: IRootStore) {
    makeAutoObservable(this)
    this.loadConversations()
  }

  get currentConversation(): Conversation | null {
    return this.conversations.find(c => c.id === this.currentConversationId) || null
  }

  get activeConversations(): Conversation[] {
    return this.conversations.filter(c => !c.isArchived)
  }

  get archivedConversations(): Conversation[] {
    return this.conversations.filter(c => c.isArchived)
  }

  createNewConversation = () => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isArchived: false
    }

    this.conversations.unshift(newConversation)
    this.setCurrentConversation(newConversation.id)
    this.saveConversations()
  }

  setCurrentConversation = (conversationId: string) => {
    this.currentConversationId = conversationId
  }

  addMessage = (content: string, role: "user" | "assistant") => {
    if (!this.currentConversation) return

    const message: Message = {
      id: uuidv4(),
      content,
      role,
      timestamp: new Date()
    }

    this.currentConversation.messages.push(message)
    this.currentConversation.updatedAt = new Date()
    
    // Auto-generate title from first user message
    if (role === "user" && this.currentConversation.messages.length === 1) {
      this.currentConversation.title = this.generateTitle(content)
    }

    this.saveConversations()
  }

  updateMessageGenerating = (messageId: string, isGenerating: boolean) => {
    if (!this.currentConversation) return
    
    const message = this.currentConversation.messages.find(m => m.id === messageId)
    if (message) {
      message.isGenerating = isGenerating
    }
  }

  regenerateResponse = () => {
    if (!this.currentConversation) return
    
    // Remove last assistant message
    const lastAssistantIndex = this.currentConversation.messages.findLastIndex(m => m.role === "assistant")
    if (lastAssistantIndex !== -1) {
      this.currentConversation.messages.splice(lastAssistantIndex)
      this.currentConversation.updatedAt = new Date()
      this.saveConversations()
    }
  }

  updateConversationTitle = (conversationId: string, newTitle: string) => {
    const conversation = this.conversations.find(c => c.id === conversationId)
    if (conversation) {
      conversation.title = newTitle
      conversation.updatedAt = new Date()
      this.saveConversations()
    }
  }

  deleteConversation = (conversationId: string) => {
    const index = this.conversations.findIndex(c => c.id === conversationId)
    if (index !== -1) {
      this.conversations.splice(index, 1)
      
      if (this.currentConversationId === conversationId) {
        this.currentConversationId = this.conversations.length > 0 ? this.conversations[0].id : null
      }
      
      this.saveConversations()
    }
  }

  archiveConversation = (conversationId: string) => {
    const conversation = this.conversations.find(c => c.id === conversationId)
    if (conversation) {
      conversation.isArchived = !conversation.isArchived
      conversation.updatedAt = new Date()
      this.saveConversations()
    }
  }

  private generateTitle = (content: string): string => {
    // Simple title generation - take first 50 characters
    const cleanContent = content.trim().replace(/\s+/g, " ")
    return cleanContent.length > 50 ? cleanContent.substring(0, 50) + "..." : cleanContent
  }

  private loadConversations = () => {
    try {
      const saved = localStorageService.getConversations()
      if (saved) {
        runInAction(() => {
          this.conversations = saved.map(conv => ({
            ...conv,
            createdAt: new Date(conv.createdAt),
            updatedAt: new Date(conv.updatedAt),
            messages: conv.messages.map(msg => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          }))
        })
      }
    } catch (error) {
      console.error("Failed to load conversations:", error)
    }
  }

  private saveConversations = () => {
    try {
      localStorageService.saveConversations(this.conversations)
    } catch (error) {
      console.error("Failed to save conversations:", error)
    }
  }
} 
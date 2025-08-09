/* eslint-disable @typescript-eslint/no-unused-vars */
import { KeyboardEvent } from "react"

export const handleKeyboardShortcuts = (
  event: KeyboardEvent,
  onSend: () => void,
  onNewChat: () => void
) => {
  // Ctrl/Cmd + Enter: Send message
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault()
    onSend()
    return
  }

  // Ctrl/Cmd + N: New chat
  if ((event.ctrlKey || event.metaKey) && event.key === "n") {
    event.preventDefault()
    onNewChat()
    return
  }

  // Ctrl/Cmd + K: Focus chat input
  if ((event.ctrlKey || event.metaKey) && event.key === "k") {
    event.preventDefault()
    const chatInput = document.querySelector(".chat-textarea") as HTMLTextAreaElement
    if (chatInput) {
      chatInput.focus()
    }
    return
  }

  // Ctrl/Cmd + L: Focus sidebar
  if ((event.ctrlKey || event.metaKey) && event.key === "l") {
    event.preventDefault()
    const sidebar = document.querySelector(".sidebar") as HTMLElement
    if (sidebar) {
      sidebar.focus()
    }
    return
  }

  // Escape: Close mobile sidebar
  if (event.key === "Escape") {
    const mobileOverlay = document.querySelector(".mobile-overlay")
    if (mobileOverlay && !mobileOverlay.classList.contains("d-none")) {
      // Close mobile sidebar logic would go here
      return
    }
  }
}

export const isModifierKey = (event: KeyboardEvent): boolean => {
  return event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
}

export const getShortcutText = (key: string, modifier: "ctrl" | "cmd" = "ctrl"): string => {
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0
  const modifierKey = isMac ? "⌘" : "Ctrl"
  return `${modifierKey}+${key.toUpperCase()}`
} 
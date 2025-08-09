/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../hooks/useStore"
import "./ChatInput.scss"

export const ChatInput: React.FC = observer(() => {
  const { conversationStore } = useStore()
  const [inputValue, setInputValue] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isGenerating) return

    const userMessage = inputValue.trim()
    setInputValue("")
    setIsGenerating(true)

    // Add user message
    conversationStore.addMessage(userMessage, "user")

    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage)
      conversationStore.addMessage(aiResponse, "assistant")
      setIsGenerating(false)
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleSubmit(e as any)
    }
  }

  const generateAIResponse = (userMessage: string): string => {
    // Simple mock AI responses for demo purposes
    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand what you're asking. Here's what I think...",
      "Great question! Based on my knowledge, I would say...",
      "I'm glad you asked that. Let me explain...",
      "That's a thoughtful point. Here's my perspective...",
      "I appreciate you bringing this up. Let me share some thoughts...",
      "That's a complex topic. Let me break it down for you...",
      "Interesting perspective! Here's what I've learned about this...",
      "I can see why you'd ask that. Let me provide some context...",
      "That's a great observation. Here's what I think about it..."
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputValue])

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
            className="chat-textarea"
            rows={1}
            disabled={isGenerating}
          />
          <button
            type="submit"
            className="send-button"
            disabled={!inputValue.trim() || isGenerating}
          >
            {isGenerating ? (
              <div className="spinner"></div>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="send-icon">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}) 
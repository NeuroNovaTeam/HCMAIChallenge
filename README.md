# AI Agent Chatting Web Application

A modern, clean React-based web application for AI agent chatting similar to ChatGPT, built with TypeScript and MobX for state management.

## 🎯 Project Overview

This is a **UI-only** application that provides a ChatGPT-like interface for AI agent conversations. The backend functionality will be implemented separately.

## 🚀 Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **State Management**: MobX
- **Styling**: Bootstrap 5 + Custom CSS
- **Build Tool**: Vite
- **Package Manager**: yarn
- **Testing**: Jest + React Testing Library

## ✨ Core Features

### Chat Interface
- **General conversation** similar to ChatGPT
- **Enter key** to send messages (no message editing after sending)
- **Markdown support** with code highlighting
- **Copy button** for each message
- **Regenerate response** button for AI messages
- **Loading states** with spinners during AI response generation

### Sidebar & Navigation
- **Collapsible/expandable sidebar**
- **Prominent "New Chat" button**
- **Conversation history** with auto-generated and editable titles
- **Hamburger menu** (☰) for mobile devices
- **Slide-out overlay sidebar** on mobile
- **Full-width chat area** when sidebar is hidden on mobile

### Conversation Management
- **Create new conversations**
- **Auto-generate conversation titles** (editable)
- **Delete conversations**
- **Archive conversations**
- **Export/Import functionality**
  - JSON format
  - Single conversation vs. all conversations
  - Data validation
  - Timestamp-based file naming

### User Experience
- **Light/Dark theme toggle**
- **ChatGPT-like color scheme**
- **Responsive design** for all devices
- **Keyboard shortcuts**
  - `Ctrl+Enter` to send
  - `Ctrl+N` for new chat
- **Tooltips and help text** for buttons
- **Browser localStorage** for user preferences and conversation history

## 🏗️ Project Structure

```
src/
├── components/           # Shared UI components
├── features/            # Feature-based organization
│   ├── chat/           # Chat functionality
│   ├── sidebar/        # Sidebar and navigation
│   ├── conversations/  # Conversation management
│   ├── themes/         # Theme management
│   └── export/         # Export/import functionality
├── stores/             # MobX stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
└── styles/             # Global styles and theme variables
```

## 🎨 Design Specifications

### Color Scheme
- **ChatGPT-like colors** for consistency
- **Light/Dark theme** support
- **Responsive color palette**

### Layout
- **Modern, clean interface** similar to ChatGPT
- **Collapsible sidebar** with smooth animations
- **Mobile-first responsive design**
- **Bootstrap 5** for consistent styling

### Components
- **Message bubbles** with proper spacing
- **Input field** with send button
- **Sidebar navigation** with conversation list
- **Loading indicators** and spinners
- **Theme toggle** button

## 📱 Responsive Design

- **Mobile-first approach**
- **Breakpoints**: Bootstrap 5 standard
- **Sidebar auto-hides** on small screens
- **Touch-friendly** interface elements
- **Smooth transitions** and animations

## 💾 Data Persistence

### Local Storage
- **User preferences** (theme, sidebar state)
- **Conversation history** (titles only)
- **App settings** and configurations

### Data Structure
```typescript
interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  // Additional preferences
}
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- yarn

### Installation
```bash
yarn install
yarn dev
```

### Build
```bash
yarn build
yarn preview
```

### Testing
```bash
yarn test
yarn test:watch
```

## 📋 Implementation Notes

### State Management
- **MobX stores** for each feature
- **Observable state** for reactive UI updates
- **Actions** for state modifications
- **Computed values** for derived state

### Component Architecture
- **Functional components** with hooks
- **TypeScript interfaces** for all props and state
- **Custom hooks** for reusable logic
- **Feature-based** organization

### Performance Considerations
- **React.memo** for expensive components
- **Lazy loading** for large components
- **Optimized re-renders** with MobX
- **Efficient list rendering** for conversations

## 🚧 Future Enhancements

- **Backend integration** for actual AI conversations
- **User authentication** and profiles
- **Conversation categories** and tags
- **Search and filtering** capabilities
- **Advanced message formatting** options
- **Real-time updates** and notifications

## 📝 Development Guidelines

### Code Style
- **camelCase** for variables, functions, and files
- **PascalCase** for components and classes
- **TypeScript strict mode** enabled
- **ESLint** and **Prettier** configuration

### Testing Strategy
- **Unit tests** for utilities and hooks
- **Component tests** with React Testing Library
- **Integration tests** for feature workflows
- **Accessibility testing** with axe-core

### Git Workflow
- **Feature branches** for development
- **Conventional commits** for commit messages
- **Pull request reviews** for code quality
- **Automated testing** on CI/CD

---

*This application provides a solid foundation for AI agent chatting with a focus on user experience, performance, and maintainability.* 
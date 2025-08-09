import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "../../hooks/useStore"


export const ThemeToggle: React.FC = observer(() => {
  const { themeStore } = useStore()

  return (
    <div className="theme-toggle">
      <button
        className="btn btn-outline-secondary btn-sm theme-btn"
        onClick={themeStore.toggleTheme}
        title={`Switch to ${themeStore.currentTheme === "light" ? "dark" : "light"} theme`}
      >
        <i className={`bi bi-${themeStore.currentTheme === "light" ? "moon" : "sun"}`}></i>
        <span className="theme-label">
          {themeStore.currentTheme === "light" ? "Dark" : "Light"}
        </span>
      </button>
    </div>
  )
}) 
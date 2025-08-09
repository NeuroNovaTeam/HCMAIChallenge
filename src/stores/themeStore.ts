import { makeAutoObservable } from "mobx"
import { localStorageService } from "../utils/localStorageService"

export class ThemeStore {
  currentTheme: "light" | "dark" = "light"

  constructor() {
    makeAutoObservable(this)
    this.loadTheme()
  }

  toggleTheme = () => {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light"
    this.applyTheme()
    this.saveTheme()
  }

  setTheme = (theme: "light" | "dark") => {
    this.currentTheme = theme
    this.applyTheme()
    this.saveTheme()
  }

  private applyTheme = () => {
    document.documentElement.setAttribute("data-theme", this.currentTheme)
  }

  private loadTheme = () => {
    try {
      const savedTheme = localStorageService.getTheme()
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        this.currentTheme = savedTheme
        this.applyTheme()
      }
    } catch (error) {
      console.error("Failed to load theme:", error)
    }
  }

  private saveTheme = () => {
    try {
      localStorageService.saveTheme(this.currentTheme)
    } catch (error) {
      console.error("Failed to save theme:", error)
    }
  }
} 
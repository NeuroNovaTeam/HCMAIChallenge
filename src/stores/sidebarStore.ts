import { makeAutoObservable } from "mobx"
import { IRootStore } from "../types"

export class SidebarStore {
  isCollapsed = false
  isMobileOpen = false

  constructor(private rootStore: IRootStore) {
    makeAutoObservable(this)
    this.initializeResponsive()
  }

  toggleCollapsed = () => {
    this.isCollapsed = !this.isCollapsed
  }

  setCollapsed = (collapsed: boolean) => {
    this.isCollapsed = collapsed
  }

  openMobileSidebar = () => {
    this.isMobileOpen = true
  }

  closeMobileSidebar = () => {
    this.isMobileOpen = false
  }

  private initializeResponsive = () => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        this.isCollapsed = false
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initial check

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }
} 
import { makeAutoObservable } from "mobx"
import { ConversationStore } from "./conversationStore"
import { ThemeStore } from "./themeStore"
import { SidebarStore } from "./sidebarStore"
import { ExportStore } from "./exportStore"
import { IRootStore } from "../types"

export class RootStore implements IRootStore {
  conversationStore: ConversationStore
  themeStore: ThemeStore
  sidebarStore: SidebarStore
  exportStore: ExportStore

  constructor() {
    this.conversationStore = new ConversationStore(this)
    this.themeStore = new ThemeStore(this)
    this.sidebarStore = new SidebarStore(this)
    this.exportStore = new ExportStore(this)

    makeAutoObservable(this)
  }
}

export const rootStore = new RootStore() 
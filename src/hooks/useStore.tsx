import React, { useContext, createContext } from "react"
import { RootStore } from "../stores/rootStore"

const StoreContext = createContext<RootStore | null>(null)

export const StoreProvider: React.FC<{ value: RootStore; children: React.ReactNode }> = ({ 
  value, 
  children 
}) => {
  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = (): RootStore => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return store
} 
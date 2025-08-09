import React from "react"
import { StoreProvider } from "./hooks/useStore"
import { rootStore } from "./stores/rootStore"
import { MainLayout } from "./components/MainLayout"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <StoreProvider value={rootStore}>
      <MainLayout />
    </StoreProvider>
  )
}

export default App 
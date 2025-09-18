import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { UserContextProvider } from './context/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
)

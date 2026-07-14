/**
 * 如意后台 — AppContext
 * 
 * 全局状态：主题、侧边栏折叠、用户信息
 * 轻量级 React Context，不引入额外状态库
 */

import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import appConfig from '../config/app.config'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(appConfig.theme)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(appConfig.layout.sidebarCollapsed)
  const [user] = useState(appConfig.user)
  const [config] = useState(appConfig)

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      sidebarCollapsed,
      setSidebarCollapsed,
      toggleSidebar,
      user,
      config,
    }),
    [theme, sidebarCollapsed, user, config, toggleSidebar, toggleTheme]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/** 获取全局应用上下文 */
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useApp() must be used within <AppProvider>')
  }
  return ctx
}

export default AppContext

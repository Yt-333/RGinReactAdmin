/**
 * ============================================================
 *  布局上下文 (LayoutContext)
 *  ============================================================
 *  控制布局的运行时行为：侧边栏折叠/展开等。
 *
 *  初始值来自 app.config.js 的 layoutConfig。
 *  用户操作（如点击折叠按钮）会更新此状态。
 *
 *  用法：
 *    const { collapsed, toggleSidebar, sidebarWidth } = useLayout()
 *  ============================================================
 */
import React, { createContext, useContext, useState, useCallback } from 'react'
import { layoutConfig } from '../config/app.config.js'

const LayoutContext = createContext(null)

export function LayoutProvider({ children }) {
  const [collapsed, setCollapsed] = useState(
    layoutConfig.sidebarCollapsed || false
  )

  const sidebarWidth = collapsed ? 64 : layoutConfig.sidebarWidth

  const toggleSidebar = useCallback(() => {
    if (!layoutConfig.sidebarCollapsible) return
    setCollapsed(prev => !prev)
  }, [])

  const value = {
    // 从配置文件读取的静态值
    sidebarWidth,
    sidebarFullWidth: layoutConfig.sidebarWidth,
    sidebarCollapsed: collapsed,
    sidebarCollapsible: layoutConfig.sidebarCollapsible,
    headerFixed: layoutConfig.headerFixed,
    headerHeight: layoutConfig.headerHeight,
    contentMaxWidth: layoutConfig.contentMaxWidth,
    showBreadcrumb: layoutConfig.showBreadcrumb,
    showFooter: layoutConfig.showFooter,
    mobileBreakpoint: layoutConfig.mobileBreakpoint,

    // 可运行时改变的
    collapsed,
    toggleSidebar,
  }

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const ctx = useContext(LayoutContext)
  if (!ctx) {
    throw new Error('useLayout() must be used inside <LayoutProvider>')
  }
  return ctx
}

export default LayoutContext

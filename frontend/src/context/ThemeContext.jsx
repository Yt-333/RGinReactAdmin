/**
 * ============================================================
 *  主题上下文 (ThemeContext)
 *  ============================================================
 *  职责：
 *    - 运行时动态注入 CSS 变量到 :root
 *    - 主题切换（保留暗色科技蓝默认）
 *    - 持久化到 localStorage
 *    - 提供 useTheme() hook 给所有组件
 *
 *  工作机制：
 *    1. 首次加载：读取 localStorage → 无则用 app.config 的 defaultTheme
 *    2. 切换主题：setTheme(id) → 更新 CSS 变量 → 存 localStorage
 *    3. CSS 变量注入：遍历主题对象，setProperty 到 :root
 *  ============================================================
 */
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { getThemeVars } from '../config/themes/index.js'
import { themeConfig } from '../config/app.config.js'

const STORAGE_KEY = 'ruyi_theme_id'

const ThemeContext = createContext(null)

/**
 * 将 CSS 变量对象注入到 :root
 */
function applyThemeVars(vars) {
  const root = document.documentElement
  if (!root) return

  // 用 requestAnimationFrame 批量执行，减少回流
  requestAnimationFrame(() => {
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value)
    }
    // 额外设置 data-theme 属性，供 CSS 选择器使用
    const mode = vars.mode || 'dark'
    root.setAttribute('data-theme', mode)
  })
}

export function ThemeProvider({ children }) {
  // 初始化：localStorage → 配置文件 → 兜底
  const [themeId, setThemeIdRaw] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return stored
    } catch (_) { /* localStorage 不可用 */ }
    return themeConfig.defaultTheme || 'dark-tech'
  })

  // 用于防止首次挂载时重复写入 localStorage
  const isFirstRender = useRef(true)

  // 切换主题
  const setThemeId = useCallback((id) => {
    const vars = getThemeVars(id)
    if (!vars) {
      console.warn(`[Theme] 未找到主题 "${id}"，回退到默认主题`)
      return
    }
    setThemeIdRaw(id)
    applyThemeVars(vars)
    try { localStorage.setItem(STORAGE_KEY, id) } catch (_) {}
  }, [])

  // 首次渲染 & themeId 变化时应用 CSS 变量
  useEffect(() => {
    const vars = getThemeVars(themeId)
    applyThemeVars(vars)
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      try { localStorage.setItem(STORAGE_KEY, themeId) } catch (_) {}
    }
  }, [themeId])

  // 获取当前主题 vars（派生值，无需 state）
  const currentVars = getThemeVars(themeId)

  const value = {
    themeId,        // 当前主题 ID，如 'dark-tech'
    setThemeId,      // 切换主题：setThemeId('light-business')
    isDark: currentVars.mode !== 'light',
    isLight: currentVars.mode === 'light',
    mode: currentVars.mode || 'dark',
    themes: themeConfig.builtinThemes, // 可用主题列表
    allowSwitch: themeConfig.allowUserSwitch,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * useTheme() — 在任意组件中获取主题信息
 *
 * 用法：
 *   const { themeId, setThemeId, isDark, mode } = useTheme()
 *   <button onClick={() => setThemeId('light-business')}>切换亮色</button>
 */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme() must be used inside <ThemeProvider>')
  }
  return ctx
}

export default ThemeContext

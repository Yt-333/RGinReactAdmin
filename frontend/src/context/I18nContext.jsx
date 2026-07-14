/**
 * ============================================================
 *  国际化 (i18n) — 中英文切换预留方案
 *  ============================================================
 *  设计原则：最简方案，够用不重。
 *  不引入 react-intl / i18next 等重型库，React Context 驱动。
 *
 *  📁 语言文件：src/config/i18n/locales/
 *     zh-CN.js  → 中文
 *     en-US.js  → 英文
 *
 *  页面用法：
 *    import { useI18n } from '../context/I18nContext.jsx'
 *    const { t } = useI18n()
 *    <h1>{t('dashboard.title')}</h1>
 *    <span>{t('common.save')}</span>
 *
 *  添加新语言：
 *    1. 在 locales/ 下新建 xx-XX.js
 *    2. registerLocale('xx-XX', { ... })
 *    3. 在 app.config.js 的 supportedLocales 中添加
 *  ============================================================
 */
import { createContext, useContext, useState, useCallback } from 'react'
import { i18nConfig } from '../config/app.config.js'

// ── 语言包注册表 ──
const localeRegistry = {}

/**
 * 注册语言包
 */
export function registerLocale(code, messages) {
  localeRegistry[code] = messages
}

const I18nContext = createContext(null)

const STORAGE_KEY = 'ruyi_locale'

export function I18nProvider({ children }) {
  const initialLocale = (() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored && i18nConfig.supportedLocales.includes(stored)) return stored
    } catch (_) {}
    return i18nConfig.defaultLocale
  })()

  const [locale, setLocaleRaw] = useState(initialLocale)

  const setLocale = useCallback((code) => {
    if (!i18nConfig.supportedLocales.includes(code)) {
      console.warn(`[i18n] 不支持的语言: ${code}`)
      return
    }
    setLocaleRaw(code)
    if (i18nConfig.persist) {
      try { localStorage.setItem(STORAGE_KEY, code) } catch (_) {}
    }
  }, [])

  /**
   * t(key) — 翻译函数
   * 支持嵌套 key：t('dashboard.title')
   */
  const t = useCallback((key, fallback) => {
    const messages = localeRegistry[locale]
    if (!messages) return fallback || key
    const value = key.split('.').reduce((obj, k) => obj?.[k], messages)
    return value ?? fallback ?? key
  }, [locale])

  const value = {
    locale,
    setLocale,
    t,
    supportedLocales: i18nConfig.supportedLocales,
    allowSwitch: i18nConfig.allowUserSwitch,
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n() must be used inside <I18nProvider>')
  }
  return ctx
}

export default I18nContext

/**
 * i18n 语言包注册入口
 */

import zhCN from './locales/zh-CN.js'
import enUS from './locales/en-US.js'

/**
 * 初始化所有语言包
 * 由 App.jsx 在启动时调用
 * @param {Function} registerLocale - I18nContext 提供的注册函数
 */
export function initLocales(registerLocale) {
  registerLocale('zh-CN', zhCN)
  registerLocale('en-US', enUS)
}

export { zhCN, enUS }

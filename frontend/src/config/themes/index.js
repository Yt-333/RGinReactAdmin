/**
 * 主题变量导出
 * 
 * 定义暗色科技蓝 (dark-tech) 和亮色商务风 (light-business) 的 CSS 变量
 * ThemeContext 会在运行时通过 setProperty 注入到 :root
 */

const themes = {
  'dark-tech': {
    /* ── 暗色基底 ── */
    '--color-bg-deep': '#060b14',
    '--color-bg-base': '#0a0f1c',
    '--color-bg-raised': '#111827',
    '--color-bg-surface': '#161d2e',

    /* ── 霓虹科技蓝 ── */
    '--color-primary': '#0d1b2a',
    '--color-primary-dark': '#060e18',
    '--color-neon': '#00d4ff',
    '--color-neon-dim': '#0891b2',
    '--color-accent': '#06b6d4',
    '--color-accent-light': '#22d3ee',
    '--color-accent-glow': 'rgba(0, 212, 255, 0.18)',

    /* ── 文字色 ── */
    '--color-text': '#e2e8f0',
    '--color-text-bright': '#f1f5f9',
    '--color-text-secondary': '#8899b4',
    '--color-text-dim': '#556680',
    '--color-text-neon': '#00d4ff',

    /* ── 边框 / 发光 ── */
    '--color-border': 'rgba(0, 212, 255, 0.10)',
    '--color-border-glow': 'rgba(0, 212, 255, 0.20)',
    '--color-border-bright': 'rgba(0, 212, 255, 0.40)',
    '--color-border-light': 'rgba(255, 255, 255, 0.06)',

    /* ── 功能色 ── */
    '--color-success': '#10b981',
    '--color-warning': '#f59e0b',
    '--color-danger': '#ef4444',
    '--color-info': '#00d4ff',

    /* ── 玻璃拟态 ── */
    '--glass-bg': 'rgba(17, 24, 39, 0.65)',
    '--glass-bg-strong': 'rgba(17, 24, 39, 0.85)',
    '--glass-bg-subtle': 'rgba(17, 24, 39, 0.35)',
    '--glass-border': 'rgba(0, 212, 255, 0.12)',
    '--glass-border-strong': 'rgba(0, 212, 255, 0.25)',
    '--glass-blur': '12px',
    '--glass-blur-strong': '20px',

    /* ── 阴影 ── */
    '--shadow-sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
    '--shadow-md': '0 4px 16px rgba(0, 0, 0, 0.4)',
    '--shadow-lg': '0 8px 32px rgba(0, 0, 0, 0.5)',

    mode: 'dark',
  },

  'light-business': {
    /* ── 亮色基底 ── */
    '--color-bg-deep': '#f1f5f9',
    '--color-bg-base': '#f8fafc',
    '--color-bg-raised': '#ffffff',
    '--color-bg-surface': '#ffffff',

    /* ── 商务蓝 ── */
    '--color-primary': '#1e3a5f',
    '--color-primary-dark': '#0f2440',
    '--color-neon': '#2563eb',
    '--color-neon-dim': '#3b82f6',
    '--color-accent': '#1d4ed8',
    '--color-accent-light': '#60a5fa',
    '--color-accent-glow': 'rgba(37, 99, 235, 0.12)',

    /* ── 文字色 ── */
    '--color-text': '#1e293b',
    '--color-text-bright': '#0f172a',
    '--color-text-secondary': '#64748b',
    '--color-text-dim': '#94a3b8',
    '--color-text-neon': '#2563eb',

    /* ── 边框 ── */
    '--color-border': 'rgba(0, 0, 0, 0.08)',
    '--color-border-glow': 'rgba(37, 99, 235, 0.15)',
    '--color-border-bright': 'rgba(37, 99, 235, 0.3)',
    '--color-border-light': 'rgba(0, 0, 0, 0.04)',

    /* ── 功能色 ── */
    '--color-success': '#10b981',
    '--color-warning': '#f59e0b',
    '--color-danger': '#ef4444',
    '--color-info': '#2563eb',

    /* ── 玻璃拟态(亮色) ── */
    '--glass-bg': 'rgba(255, 255, 255, 0.7)',
    '--glass-bg-strong': 'rgba(255, 255, 255, 0.9)',
    '--glass-bg-subtle': 'rgba(255, 255, 255, 0.45)',
    '--glass-border': 'rgba(0, 0, 0, 0.08)',
    '--glass-border-strong': 'rgba(0, 0, 0, 0.15)',
    '--glass-blur': '10px',
    '--glass-blur-strong': '16px',

    /* ── 阴影 ── */
    '--shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.08)',
    '--shadow-md': '0 4px 12px rgba(0, 0, 0, 0.1)',
    '--shadow-lg': '0 8px 24px rgba(0, 0, 0, 0.15)',

    mode: 'light',
  },
}

/**
 * 获取指定主题的 CSS 变量对象
 * @param {string} themeId - 主题 ID ('dark-tech' | 'light-business')
 * @returns {Record<string, string>}
 */
export function getThemeVars(themeId) {
  return themes[themeId] || themes['dark-tech']
}

export default themes

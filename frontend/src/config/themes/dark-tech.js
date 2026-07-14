/**
 * ============================================================
 *  暗夜科技蓝主题 — 默认皮肤
 *  ============================================================
 *  风格：暗色基底 + 霓虹科技蓝 + 玻璃拟态 + 3D动效
 *  这是现有视觉体系的 CSS 变量提取版本。
 *
 *  每种主题只需导出一个 CSS 变量对象。
 *  运行时通过 ThemeContext 注入到 :root。
 *  ============================================================
 */
export const darkTech = {
  mode: 'dark',

  /* ════ 基底色 ════ */
  '--color-bg-deep':    '#060b14',
  '--color-bg-base':    '#0a0f1c',
  '--color-bg-raised':  '#111827',
  '--color-bg-surface': '#161d2e',

  /* ════ 主色调 ════ */
  '--color-primary':      '#0d1b2a',
  '--color-primary-dark': '#060e18',
  '--color-neon':         '#00d4ff',
  '--color-neon-dim':     '#0891b2',
  '--color-accent':       '#06b6d4',
  '--color-accent-light': '#22d3ee',
  '--color-accent-glow':  'rgba(0, 212, 255, 0.18)',

  /* ════ 文字 ════ */
  '--color-text':            '#e2e8f0',
  '--color-text-bright':     '#f1f5f9',
  '--color-text-secondary':  '#8899b4',
  '--color-text-dim':        '#556680',
  '--color-text-neon':       '#00d4ff',

  /* ════ 边框 ════ */
  '--color-border':        'rgba(0, 212, 255, 0.10)',
  '--color-border-glow':   'rgba(0, 212, 255, 0.20)',
  '--color-border-bright': 'rgba(0, 212, 255, 0.40)',
  '--color-border-light':  'rgba(255, 255, 255, 0.06)',

  /* ════ 功能色 ════ */
  '--color-success': '#10b981',
  '--color-warning': '#f59e0b',
  '--color-danger':  '#ef4444',
  '--color-info':    '#00d4ff',

  /* ════ 玻璃拟态 ════ */
  '--glass-bg':            'rgba(17, 24, 39, 0.65)',
  '--glass-bg-strong':     'rgba(17, 24, 39, 0.85)',
  '--glass-bg-subtle':     'rgba(17, 24, 39, 0.35)',
  '--glass-border':        'rgba(0, 212, 255, 0.12)',
  '--glass-border-strong': 'rgba(0, 212, 255, 0.25)',
  '--glass-blur':          '12px',
  '--glass-blur-strong':   '20px',

  /* ════ 阴影 & 发光 ════ */
  '--shadow-sm':   '0 2px 8px rgba(0, 0, 0, 0.3)',
  '--shadow-md':   '0 4px 16px rgba(0, 0, 0, 0.4)',
  '--shadow-lg':   '0 8px 32px rgba(0, 0, 0, 0.5)',
  '--glow-neon':   '0 0 12px rgba(0, 212, 255, 0.30), 0 0 2px rgba(0, 212, 255, 0.5)',
  '--glow-card':   '0 0 20px rgba(0, 212, 255, 0.08), 0 0 2px rgba(0, 212, 255, 0.15)',

  /* ════ 背景特效 ════ */
  '--bg-grid-color': 'rgba(0, 212, 255, 0.025)',
  '--bg-grid-sub-color': 'rgba(0, 212, 255, 0.012)',
  '--bg-glow-color': 'rgba(0, 212, 255, 0.04)',
}

export default darkTech

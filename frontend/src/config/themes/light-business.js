/**
 * ============================================================
 *  商务白昼主题 — 亮色皮肤
 *  ============================================================
 *  风格：白色基底 + 专业蓝主色 + 轻微阴影 + 商务扁平化
 *  适合：企业内部系统、SaaS 产品、商务场景
 *
 *  暗色主题的 CSS 变量名保持一致，只需改变值。
 *  运行时通过 ThemeContext 覆盖 :root 变量。
 *  ============================================================
 */
export const lightBusiness = {
  mode: 'light',

  /* ════ 基底色（白底灰色阶） ════ */
  '--color-bg-deep':    '#f0f2f5',
  '--color-bg-base':    '#f5f6fa',
  '--color-bg-raised':  '#ffffff',
  '--color-bg-surface': '#fafbfc',

  /* ════ 主色调（专业商务蓝） ════ */
  '--color-primary':      '#1e3a5f',
  '--color-primary-dark': '#152238',
  '--color-neon':         '#3b82f6',
  '--color-neon-dim':     '#2563eb',
  '--color-accent':       '#1d4ed8',
  '--color-accent-light': '#60a5fa',
  '--color-accent-glow':  'rgba(59, 130, 246, 0.12)',

  /* ════ 文字（白底深字） ════ */
  '--color-text':            '#1e293b',
  '--color-text-bright':     '#0f172a',
  '--color-text-secondary':  '#64748b',
  '--color-text-dim':        '#94a3b8',
  '--color-text-neon':       '#3b82f6',

  /* ════ 边框（灰色系） ════ */
  '--color-border':        'rgba(0, 0, 0, 0.06)',
  '--color-border-glow':   'rgba(59, 130, 246, 0.20)',
  '--color-border-bright': 'rgba(59, 130, 246, 0.35)',
  '--color-border-light':  'rgba(0, 0, 0, 0.04)',

  /* ════ 功能色（保持一致） ════ */
  '--color-success': '#10b981',
  '--color-warning': '#f59e0b',
  '--color-danger':  '#ef4444',
  '--color-info':    '#3b82f6',

  /* ════ 玻璃拟态（白底半透明） ════ */
  '--glass-bg':            'rgba(255, 255, 255, 0.75)',
  '--glass-bg-strong':     'rgba(255, 255, 255, 0.92)',
  '--glass-bg-subtle':     'rgba(255, 255, 255, 0.45)',
  '--glass-border':        'rgba(0, 0, 0, 0.06)',
  '--glass-border-strong': 'rgba(59, 130, 246, 0.20)',
  '--glass-blur':          '12px',
  '--glass-blur-strong':   '20px',

  /* ════ 阴影 & 发光（浅色版） ════ */
  '--shadow-sm':   '0 1px 3px rgba(0, 0, 0, 0.06)',
  '--shadow-md':   '0 4px 12px rgba(0, 0, 0, 0.08)',
  '--shadow-lg':   '0 8px 24px rgba(0, 0, 0, 0.10)',
  '--glow-neon':   '0 0 8px rgba(59, 130, 246, 0.20), 0 0 2px rgba(59, 130, 246, 0.3)',
  '--glow-card':   '0 0 12px rgba(59, 130, 246, 0.06), 0 0 1px rgba(59, 130, 246, 0.10)',

  /* ════ 背景特效（亮色版淡化） ════ */
  '--bg-grid-color':     'rgba(59, 130, 246, 0.06)',
  '--bg-grid-sub-color': 'rgba(59, 130, 246, 0.03)',
  '--bg-glow-color':     'rgba(59, 130, 246, 0.05)',
}

export default lightBusiness

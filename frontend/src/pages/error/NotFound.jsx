/**
 * NotFound — 404 页面
 */

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ fontSize: 80, opacity: 0.3, marginBottom: 16 }}>404</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--color-text-bright)', letterSpacing: 2 }}>
        页面未找到
      </h2>
      <p style={{ color: 'var(--color-text-dim)', marginTop: 8, fontSize: 13 }}>
        您访问的页面不存在或已被移除
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block', marginTop: 24, padding: '10px 24px',
          background: 'rgba(0,212,255,0.12)', color: 'var(--color-neon)',
          borderRadius: 'var(--radius-sm)', textDecoration: 'none',
          border: '1px solid rgba(0,212,255,0.2)', fontSize: 14,
          transition: 'all 0.2s',
        }}
      >
        ← 返回首页
      </Link>
    </div>
  )
}

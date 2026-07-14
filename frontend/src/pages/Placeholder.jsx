/**
 * Placeholder — 功能开发中占位页面
 * 
 * @param {Object} props
 * @param {string} props.title - 页面标题
 * @param {string} [props.icon] - 图标
 */

export default function Placeholder({ title, icon = '🚧' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #0a1525 0%, #0d1f38 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          textAlign: 'center',
          border: '1px solid rgba(0,212,255,0.10)',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.6 }}>{icon}</div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            color: 'var(--color-text-bright)',
            letterSpacing: 2,
          }}
        >
          {title}
        </h2>
        <p style={{ color: 'var(--color-text-dim)', marginTop: 8, fontSize: 13 }}>
          功能开发中，敬请期待...
        </p>
      </div>
    </div>
  )
}

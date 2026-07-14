import React from 'react'

export default function Header() {
  const [currentTime, setCurrentTime] = React.useState('')

  React.useEffect(() => {
    const update = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        }) +
        '  ' +
        now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      )
    }
    update()
    const timer = setInterval(update, 30000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-breadcrumb">
          首页 <span className="header-breadcrumb-sep">/</span> <span>仪表盘</span>
        </div>
      </div>

      <div className="header-right">
        <span style={{ fontSize: 12, color: 'var(--color-text-light)', marginRight: 8 }}>
          {currentTime}
        </span>
        <button className="header-action header-notify-dot" title="消息">🔔</button>
        <button className="header-action" title="全屏">⛶</button>
      </div>
    </header>
  )
}

import React from 'react'

const menuItems = [
  {
    section: '导航',
    items: [
      { key: 'dashboard', icon: '📊', label: '仪表盘', active: true },
      { key: 'analytics', icon: '📈', label: '数据分析' },
      { key: 'workspace', icon: '💼', label: '工作台' },
    ]
  },
  {
    section: '管理',
    items: [
      { key: 'users', icon: '👥', label: '用户管理' },
      { key: 'roles', icon: '🔐', label: '角色权限' },
      { key: 'logs', icon: '📋', label: '操作日志' },
    ]
  },
  {
    section: '内容',
    items: [
      { key: 'articles', icon: '📝', label: '文章管理' },
      { key: 'media', icon: '🖼️', label: '媒体资源' },
      { key: 'settings', icon: '⚙️', label: '系统设置' },
    ]
  },
]

export default function Sidebar() {
  const [activeKey, setActiveKey] = React.useState('dashboard')

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">☁️</div>
        <span className="sidebar-logo-text">如意后台</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((group) => (
          <div className="sidebar-section" key={group.section}>
            <div className="sidebar-section-title">{group.section}</div>
            {group.items.map((item) => (
              <div
                key={item.key}
                className={`sidebar-item ${activeKey === item.key ? 'active' : ''}`}
                onClick={() => setActiveKey(item.key)}
              >
                <span className="sidebar-item-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">管</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">管理员</div>
            <div className="sidebar-user-role">超级管理员</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

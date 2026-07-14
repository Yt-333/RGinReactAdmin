/**
 * Sidebar — 侧边栏导航
 *
 * 菜单数据来自 config/app.config.js 的 menuItems
 * 使用 react-router-dom 的 NavLink 实现路由高亮
 */

import { useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { appInfo, menuItems } from '../../config/app.config.js'

export default function Sidebar() {
  const location = useLocation()

  const handleItemMouseMove = useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }, [])

  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar-logo">
        <div className="sidebar-logo-icon">{appInfo.logo}</div>
        <span className="sidebar-logo-text">{appInfo.shortName}</span>
      </NavLink>

      <nav className="sidebar-nav">
        {menuItems.map((group) => (
          <div className="sidebar-section" key={group.section}>
            <div className="sidebar-section-title">{group.section}</div>
            {group.items.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/' || location.pathname === '/dashboard'
                  : location.pathname.startsWith(item.path)

              return (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                  onMouseMove={isActive ? handleItemMouseMove : undefined}
                  end={item.path === '/' || item.path === '/dashboard'}
                >
                  <span className="sidebar-item-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
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

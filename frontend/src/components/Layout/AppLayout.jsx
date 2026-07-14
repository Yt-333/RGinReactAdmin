/**
 * AppLayout — 全局布局外壳
 *
 * 使用 react-router-dom 的 <Outlet /> 渲染子路由
 * 集成了主题、布局、国际化上下文
 */
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useLayout } from '../../context/LayoutContext.jsx'
import Sidebar from './Sidebar'
import Header from './Header'
import './Layout.css'

export default function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { sidebarWidth, headerFixed, showFooter } = useLayout()

  const currentPath = location.pathname

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <div className="layout">
      <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />
      <div
        className="main-area"
        style={{ marginLeft: sidebarWidth }}
      >
        {headerFixed && <Header currentPath={currentPath} />}
        <main className="content" style={headerFixed ? {} : { paddingTop: 0 }}>
          {!headerFixed && <Header currentPath={currentPath} />}
          <Outlet />
        </main>
        {showFooter && (
          <footer style={{
            padding: '12px 24px', fontSize: 12,
            color: 'var(--color-text-dim)',
            borderTop: '1px solid var(--color-border-light)',
            textAlign: 'center',
          }}>
            © {new Date().getFullYear()} 如意科技. All rights reserved.
          </footer>
        )}
      </div>
    </div>
  )
}

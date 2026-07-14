/**
 * Layout — 全局布局
 * 
 * 使用 react-router-dom 的 Outlet 渲染子路由
 * 固定：侧边栏 + 顶部导航
 */

import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import './AppLayout.css'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-area">
        <Header currentPath={location.pathname} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

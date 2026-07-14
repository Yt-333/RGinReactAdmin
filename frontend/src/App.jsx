/**
 * ============================================================
 *  应用入口 — 配置驱动的路由系统
 *  ============================================================
 *  Provider 层：ThemeProvider → LayoutProvider → I18nProvider
 *  路由：从 app.config.js 的 pageRegistry 自动生成
 *
 *  改动此文件的情形很少：
 *    - 添加新页面：只需修改 app.config.js
 *    - 修改主题：  只需修改 app.config.js 或 .env
 *    - 修改菜单：  只需修改 app.config.js
 *  ============================================================
 */
import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LayoutProvider } from './context/LayoutContext.jsx'
import { I18nProvider, registerLocale } from './context/I18nContext.jsx'
import { initLocales } from './config/i18n/index.js'
import { buildRoutes, PageLoading } from './config/routes.jsx'
import { defaultRoute, appInfo } from './config/app.config.js'

import AppLayout from './components/Layout/AppLayout'
import NotFound from './pages/error/NotFound'

// ═══ 初始化语言包 ═══
initLocales(registerLocale)

// ═══ 懒加载占位页（pages 尚未实现时用） ═══
const Placeholder = lazy(() => import('./pages/Placeholder.jsx'))

/**
 * 根据 pageRegistry 动态生成的路由列表
 */
function AutoRoutes() {
  const routes = buildRoutes()

  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* 默认重定向 */}
        <Route index element={<Navigate to={defaultRoute} replace />} />

        {/* 配置驱动的自动路由 */}
        {routes.map((route) => {
          const Page = route.component
          return (
            <Route
              key={route.key}
              path={route.path.replace(/^\//, '')}
              element={
                <Suspense fallback={<PageLoading />}>
                  <Page />
                </Suspense>
              }
            />
          )
        })}

        {/* 未实现的路由用 Placeholder 兜底 */}
        <Route path="*" element={
          <Suspense fallback={<PageLoading />}>
            <Placeholder title="页面开发中" icon="🚧" />
          </Suspense>
        } />
      </Route>
    </Routes>
  )
}

/**
 * App — 顶层 Provider 包裹
 */
export default function App() {
  React.useEffect(() => {
    document.title = appInfo.name
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider>
        <LayoutProvider>
          <I18nProvider>
            <AutoRoutes />
          </I18nProvider>
        </LayoutProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

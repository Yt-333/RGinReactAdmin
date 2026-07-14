/**
 * ============================================================
 *  可插拔页面模块 — 路由配置
 *  ============================================================
 *  这是路由系统的"注册表"。每次添加新页面只需：
 *
 *    1. 在 pages/ 下新建组件
 *    2. 在 app.config.js 的 pageRegistry 中添加懒加载条目
 *    3. 在 app.config.js 的 menuItems 中添加菜单项
 *    （如果不需要菜单入口，只做步骤 1+2）
 *
 *  本文件负责：
 *    - 根据 pageRegistry 自动生成路由表
 *    - 支持权限过滤（roles）
 *    - 支持嵌套路由（可选）
 *  ============================================================
 */
import { lazy, Suspense } from 'react'
import { pageRegistry, menuItems, defaultRoute, notFoundPage } from './app.config.js'

/**
 * 获取所有需要注册路由的页面 key
 * （从 menuItems 中提取 + 从 pageRegistry 中提取，取并集）
 */
function getAllRouteKeys() {
  const keys = new Set(Object.keys(pageRegistry))

  // 也从菜单中提取（以防 pageRegistry 有但菜单没有）
  menuItems.forEach(group => {
    group.items?.forEach(item => {
      if (item.key) keys.add(item.key)
      item.children?.forEach(child => {
        if (child.key) keys.add(child.key)
      })
    })
  })

  return [...keys]
}

/**
 * 根据 key 生成路由对象数组
 */
export function buildRoutes() {
  const keys = getAllRouteKeys()
  const routes = []

  keys.forEach(key => {
    // 检查 pageRegistry 是否有此页面的懒加载函数
    const loader = pageRegistry[key]
    if (!loader) {
      // 页面尚未实现，跳过（不会导致报错）
      console.warn(`[Router] 页面 "${key}" 已注册但尚未实现组件`)
      return
    }

    // 从 menuItems 中查找此 key 的 path
    const path = findPathByKey(key) || `/${key}`

    // 创建懒加载组件
    const PageComponent = lazy(loader)

    routes.push({
      key,
      path,
      component: PageComponent,
      // 权限信息从菜单中读取
      roles: findRolesByKey(key),
    })
  })

  return routes
}

/**
 * 从 menuItems 中查找某个 key 对应的 path
 */
function findPathByKey(key) {
  for (const group of menuItems) {
    for (const item of group.items || []) {
      if (item.key === key) return item.path
      for (const child of item.children || []) {
        if (child.key === key) return child.path
      }
    }
  }
  return null
}

/**
 * 从 menuItems 中查找某个 key 对应的 roles
 */
function findRolesByKey(key) {
  for (const group of menuItems) {
    for (const item of group.items || []) {
      if (item.key === key) return item.roles
      for (const child of item.children || []) {
        if (child.key === key) return child.roles
      }
    }
  }
  return null
}

/**
 * 加载中占位组件
 */
export function PageLoading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: 'var(--color-text-secondary)',
      fontSize: '14px',
    }}>
      ⏳ 加载中...
    </div>
  )
}

/**
 * 懒加载包装器
 */
export function LazyPage({ component: Component }) {
  return (
    <Suspense fallback={<PageLoading />}>
      <Component />
    </Suspense>
  )
}

export default buildRoutes

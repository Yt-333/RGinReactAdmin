/**
 * ============================================================
 *  如意后台 · 应用主配置文件 (app.config.js)
 *  ============================================================
 *  这是项目的"唯一真相源"——clone 后只需修改此文件即可定制。
 *  所有组件都从此文件读取配置，无需深入源码。
 *
 *  🚀 快速上手：
 *    1. 修改 appInfo  → 项目名称、Logo、页脚信息
 *    2. 修改 menuItems → 侧边栏菜单结构
 *    3. 不改任何 JSX 即可生成自己的后台系统
 *
 *  ⚠️  注意：本文件导出的是静态配置对象。
 *      需要运行时切换的值（主题、语言、布局偏好）存到
 *      localStorage，初始值由此文件提供。
 *  ============================================================
 */

// ───────────────────────────────────────────
//  1. 应用基本信息
// ───────────────────────────────────────────
export const appInfo = {
  /** 浏览器标题 / 登录页大标题 */
  name: '如意后台管理系统',
  /** 侧边栏 Logo 处短名称 */
  shortName: '如意后台',
  /** 侧边栏 Logo 图标（Emoji / 图片 URL / SVG 组件均可） */
  logo: '☁️',
  /** 页脚版权文字 */
  footer: `© ${new Date().getFullYear()} 如意科技. All rights reserved.`,
  /** 默认语言 */
  defaultLocale: 'zh-CN',
  /** 支持的语言列表 */
  locales: ['zh-CN', 'en-US'],
}

// ───────────────────────────────────────────
//  2. 主题配置（默认皮肤 + 内置皮肤列表）
// ───────────────────────────────────────────
export const themeConfig = {
  /** 默认主题 ID */
  defaultTheme: 'dark-tech',

  /** 内置主题列表 */
  builtinThemes: [
    {
      id: 'dark-tech',
      name: '暗夜科技',
      /** 此主题对应的 CSS 变量覆盖（见 themes/dark-tech.js） */
      mode: 'dark',
      /** 在主题切换器中显示的预览色 */
      preview: ['#0d1b2a', '#00d4ff', '#06b6d4'],
    },
    {
      id: 'light-business',
      name: '商务白昼',
      mode: 'light',
      preview: ['#ffffff', '#1e40af', '#3b82f6'],
    },
  ],

  /** 是否允许用户在界面上切换主题 */
  allowUserSwitch: true,
}

// ───────────────────────────────────────────
//  3. 布局配置
// ───────────────────────────────────────────
export const layoutConfig = {
  /** 侧边栏宽度 (px) */
  sidebarWidth: 230,
  /** 侧边栏是否默认折叠（收起后约 64px） */
  sidebarCollapsed: false,
  /** 侧边栏是否可以由用户折叠/展开 */
  sidebarCollapsible: true,
  /** 顶部 Header 是否固定（sticky） */
  headerFixed: true,
  /** 顶部 Header 高度 */
  headerHeight: 60,
  /** 内容区最大宽度（null = 不限制，1240 = 居中限宽） */
  contentMaxWidth: null,
  /** 移动端断点 */
  mobileBreakpoint: 768,
  /** 是否显示面包屑 */
  showBreadcrumb: true,
  /** 是否显示页脚 */
  showFooter: false,
}

// ───────────────────────────────────────────
//  4. 菜单配置（侧边栏 + 路由）
//  ============================================
//  这是最重要的配置！结构：
//    section   → 分组名（可选，传 null 为无分组）
//    items[]   → 菜单项
//      key     → 唯一标识（与路由 path 对应）
//      label   → 显示文字（国际化 key）
//      icon    → 图标（Emoji / React 组件均可）
//      path    → 路由路径
//      roles   → 权限（null = 所有人可见）
//      badge   → 角标数字（可选）
//      children→ 子菜单（可选）
//  ============================================
export const menuItems = [
  {
    section: '导航',
    items: [
      { key: 'dashboard',  icon: '📊', label: '仪表盘',   path: '/dashboard',  roles: null },
      { key: 'analytics',  icon: '📈', label: '数据分析',  path: '/analytics',  roles: null },
      { key: 'workspace',  icon: '💼', label: '工作台',    path: '/workspace',  roles: null },
    ]
  },
  {
    section: '管理',
    items: [
      { key: 'users',      icon: '👥', label: '用户管理',  path: '/users',      roles: ['admin'] },
      { key: 'roles',      icon: '🔐', label: '角色权限',  path: '/roles',      roles: ['admin'] },
      { key: 'logs',       icon: '📋', label: '操作日志',  path: '/logs',       roles: ['admin'] },
    ]
  },
  {
    section: '内容',
    items: [
      { key: 'articles',   icon: '📝', label: '文章管理',  path: '/articles',   roles: null },
      { key: 'media',      icon: '🖼️', label: '媒体资源', path: '/media',      roles: null },
      { key: 'settings',   icon: '⚙️', label: '系统设置',  path: '/settings',   roles: ['admin'] },
    ]
  },
]

// ───────────────────────────────────────────
//  5. 页面注册表（可插拔模块）
// ───────────────────────────────────────────
/**
 * 页面注册表：key → page component
 * 新增页面的最少步骤：
 *   1. 在 pages/ 下新建组件
 *   2. 在此添加一条注册
 *   3. 在 menuItems 中添加菜单项（如需侧边栏显示）
 *   详见 README 二次开发指南
 */
export const pageRegistry = {
  dashboard:  () => import('../pages/Dashboard/Dashboard.jsx'),
  // 预留占位页面(按需取消注释)
  // analytics:  () => import('../pages/Analytics/Analytics.jsx'),
  // users:      () => import('../pages/Users/Users.jsx'),
  // roles:      () => import('../pages/Roles/Roles.jsx'),
  // logs:       () => import('../pages/Logs/Logs.jsx'),
  // articles:   () => import('../pages/Articles/Articles.jsx'),
  // media:      () => import('../pages/Media/Media.jsx'),
  // settings:   () => import('../pages/Settings/Settings.jsx'),
  // workspace:  () => import('../pages/Workspace/Workspace.jsx'),
}

/**
 * 默认路由（访问 / 时跳转到）
 */
export const defaultRoute = '/dashboard'

/**
 * 404 页面（可选）
 */
export const notFoundPage = null // 设为 () => import('../pages/404.jsx') 等

// ───────────────────────────────────────────
//  6. API / Mock 配置
// ───────────────────────────────────────────
export const apiConfig = {
  /** 是否使用 Mock 数据（true=本地Mock, false=真实API） */
  useMock: import.meta.env.VITE_USE_MOCK !== 'false',

  /** 真实 API 基础地址 */
  baseURL: import.meta.env.VITE_API_BASE || '/api',

  /** 请求超时 (ms) */
  timeout: 15000,

  /** 鉴权 token 存储 key */
  tokenKey: 'ruyi_token',

  /** 是否自动在请求头附加 token */
  authHeader: true,
}

// ───────────────────────────────────────────
//  7. 国际化配置
// ───────────────────────────────────────────
export const i18nConfig = {
  /** 默认语言 */
  defaultLocale: 'zh-CN',
  /** 支持的语言 */
  supportedLocales: ['zh-CN', 'en-US'],
  /** 是否允许用户切换语言 */
  allowUserSwitch: true,
  /** 是否将语言偏好持久化到 localStorage */
  persist: true,
}

// ───────────────────────────────────────────
//  8. 导出一个统一入口（可选：有些地方只需整体导入）
// ───────────────────────────────────────────
export default {
  appInfo,
  themeConfig,
  layoutConfig,
  menuItems,
  pageRegistry,
  defaultRoute,
  notFoundPage,
  apiConfig,
  i18nConfig,
}

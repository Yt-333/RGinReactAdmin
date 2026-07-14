# RGinReactAdmin
使用Gin框架和React框架开发的前后端分离的纯AI驱动的现代管理系统
# 如意后台管理系统 (Ruyi Admin)

> 🚀 **复制即用** — Clone 本项目，修改一个配置文件，生成你自己的后台管理系统。

---

## 目录

- [快速开始](#快速开始)
- [⚡ 5 分钟定制指南](#-5-分钟定制指南)
- [📁 项目结构](#-项目结构)
- [🎨 主题/皮肤切换](#-主题皮肤切换)
- [📐 布局配置](#-布局配置)
- [🔄 Mock ↔ 真实 API 切换](#-mock--真实-api-切换)
- [🌍 国际化 (i18n)](#-国际化-i18n)
- [🧩 添加新页面（可插拔模块）](#-添加新页面可插拔模块)
- [📦 配置文件一览](#-配置文件一览)
- [🧪 最佳实践](#-最佳实践)

---

## 快速开始

```bash
# 1. 克隆项目
git clone <repo-url> my-admin
cd my-admin/frontend

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 浏览器访问 http://localhost:5173
```

---

## ⚡ 5 分钟定制指南

**你只需要修改一个文件：**`src/config/app.config.js`

### 第 1 分钟：改名

```js
// src/config/app.config.js
export const appInfo = {
  name: '我的后台系统',       // 浏览器标题
  shortName: '我的后台',      // 侧边栏短名
  logo: '🚀',                 // 侧边栏 Logo (emoji / URL)
  footer: '© 2026 My Company',
}
```

### 第 2 分钟：改菜单

```js
// src/config/app.config.js
export const menuItems = [
  {
    section: '业务',
    items: [
      { key: 'orders',    icon: '📦', label: '订单管理', path: '/orders' },
      { key: 'products',  icon: '🏷️', label: '商品管理', path: '/products' },
      { key: 'customers', icon: '👥', label: '客户管理', path: '/customers' },
    ]
  },
  // ... 删除不需要的，加上你需要的
]
```

### 第 3 分钟：注册新页面

```js
// src/config/app.config.js
export const pageRegistry = {
  dashboard: () => import('../pages/Dashboard/Dashboard.jsx'),
  orders:    () => import('../pages/Orders/Orders.jsx'),       // 新增
  products:  () => import('../pages/Products/Products.jsx'),   // 新增
  customers: () => import('../pages/Customers/Customers.jsx'), // 新增
}
```

### 第 4 分钟：改主题

默认是暗夜科技蓝。如果你想换亮色商务风为默认：

```js
// src/config/app.config.js
export const themeConfig = {
  defaultTheme: 'light-business',  // 改这里即可
  // ...
}
```

### 第 5 分钟：跑起来

```bash
npm run dev
```

你的定制后台已经在浏览器里了。

---

## 📁 项目结构

```
frontend/
├── .env.example              ← 环境变量模板
├── .env                      ← 本地环境变量（不提交 git）
├── index.html                ← HTML 入口
├── vite.config.js            ← Vite 构建配置
├── package.json
│
└── src/
    ├── main.jsx              ← React 入口
    ├── App.jsx               ← Provider 包裹 + 路由
    ├── index.css             ← 全局样式 + CSS 变量
    │
    ├── config/               ← 🔧 配置中心（最常改的目录）
    │   ├── app.config.js     ← ★ 主配置文件
    │   ├── api.js            ← API 适配层 (Mock/真实切换)
    │   ├── routes.js         ← 路由注册系统
    │   ├── themes/           ← 主题皮肤定义
    │   │   ├── index.js      ← 主题注册表
    │   │   ├── dark-tech.js  ← 暗夜科技蓝
    │   │   └── light-business.js ← 商务白昼
    │   └── i18n/             ← 国际化
    │       ├── index.js      ← 语言包加载
    │       └── locales/
    │           ├── zh-CN.js  ← 中文
    │           └── en-US.js  ← 英文
    │
    ├── context/              ← React Context
    │   ├── ThemeContext.jsx   ← 主题切换
    │   ├── LayoutContext.jsx  ← 布局状态
    │   └── I18nContext.jsx    ← 国际化
    │
    ├── components/
    │   └── Layout/           ← 布局组件
    │       ├── Layout.jsx    ← 壳组件
    │       ├── Layout.css
    │       ├── Sidebar.jsx   ← 侧边栏
    │       └── Header.jsx    ← 顶栏
    │
    ├── pages/                ← 📄 页面（在此新增）
    │   └── Dashboard/
    │       ├── Dashboard.jsx
    │       └── Dashboard.css
    │
    ├── mock/                 ← Mock 数据（开发用）
    │   └── dashboardData.js
    │
    └── assets/               ← 静态资源
```

---

## 🎨 主题/皮肤切换

### 内置主题

| 主题 ID | 名称 | 风格 |
|--------|------|------|
| `dark-tech` | 暗夜科技 | 暗色基底 + 霓虹科技蓝 + 玻璃拟态 + 3D 动效 |
| `light-business` | 商务白昼 | 白色基底 + 专业蓝 + 轻微阴影 + 商务扁平化 |

### 在代码中切换

```jsx
import { useTheme } from '../context/ThemeContext.jsx'

function MyComponent() {
  const { themeId, setThemeId, isDark } = useTheme()

  return (
    <button onClick={() => setThemeId('light-business')}>
      切换到亮色主题
    </button>
  )
}
```

### 添加自定义主题

1. 在 `src/config/themes/` 下新建 JS 文件，导出一组 CSS 变量
2. 在 `src/config/themes/index.js` 中注册
3. 在 `app.config.js` 的 `builtinThemes` 数组中添加条目

```js
// src/config/themes/my-theme.js
export const myTheme = {
  mode: 'dark',  // 'dark' | 'light'
  '--color-bg-base': '#111',
  '--color-neon': '#ff6b6b',
  // ... 覆盖所有 CSS 变量
}

// src/config/themes/index.js
import { myTheme } from './my-theme.js'
export const themes = {
  'dark-tech': darkTech,
  'light-business': lightBusiness,
  'my-theme': myTheme,  // 新增
}
```

### 主题工作原理

```
app.config.js  →  ThemeContext  →  动态注入 CSS 变量到 :root
                  ↓
              localStorage 持久化
```

所有组件使用 `var(--color-neon)` 等 CSS 变量 — 改一个值，全局变色。

---

## 📐 布局配置

```js
// src/config/app.config.js
export const layoutConfig = {
  sidebarWidth: 230,          // 侧边栏宽度 (px)
  sidebarCollapsed: false,    // 默认是否折叠
  sidebarCollapsible: true,   // 是否允许用户折叠
  headerFixed: true,          // 顶部固定
  headerHeight: 60,           // 顶栏高度
  contentMaxWidth: null,      // 内容区最大宽度 (null=不限)
  mobileBreakpoint: 768,      // 移动端断点
  showBreadcrumb: true,       // 显示面包屑
  showFooter: false,          // 显示页脚
}
```

### 运行时控制侧边栏折叠

```jsx
import { useLayout } from '../context/LayoutContext.jsx'

function MyComponent() {
  const { collapsed, toggleSidebar, sidebarWidth } = useLayout()
  // sidebarWidth 会自动根据折叠状态返回 64 或 230
}
```

---

## 🔄 Mock ↔ 真实 API 切换

### 模式切换（零代码改动）

```bash
# .env 文件
VITE_USE_MOCK=true    # 使用 Mock 数据（开发阶段）
VITE_USE_MOCK=false   # 连接真实后端
VITE_API_BASE=http://your-server:8080/api
```

### 在页面中使用

```jsx
import { api } from '../config/api.js'

// 自动根据 .env 决定走 Mock 还是真实 API
const data = await api.get('/dashboard/stats')
const result = await api.post('/users', { name: '张伟' })
```

### 注册 Mock 路由（可选）

```js
// src/mock/data.js
import { registerMock } from '../config/api.js'

registerMock('GET /api/dashboard/stats', () => ({
  totalUsers: 12846,
  monthlyOrders: 3421,
}))
```

### 自定义 API 客户端

```js
import { createApiClient } from '../config/api.js'

const customApi = createApiClient('http://other-service:3000')
customApi.get('/health')
```

---

## 🌍 国际化 (i18n)

### 在组件中使用

```jsx
import { useI18n } from '../context/I18nContext.jsx'

function MyPage() {
  const { t, locale, setLocale } = useI18n()

  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <button onClick={() => setLocale('en-US')}>English</button>
    </div>
  )
}
```

### 添加新语言

1. 新建 `src/config/i18n/locales/ja-JP.js`
2. 在 `src/config/i18n/index.js` 中注册：`registerLocale('ja-JP', jaJP)`
3. 在 `app.config.js` 的 `supportedLocales` 中添加 `'ja-JP'`
4. 在 Header 的语言下拉框中会自动出现

### 翻译 key 格式

```js
t('common.save')           // → '保存'
t('dashboard.greeting')     // → '早上好'
t('menu.users')            // → '用户管理'
t('unknown.key', '默认值')  // → '默认值'（作为 fallback）
```

---

## 🧩 添加新页面（可插拔模块）

### 最少 3 步

```
步骤 1: 创建页面组件
        src/pages/Products/Products.jsx

步骤 2: 在 app.config.js 中注册
        pageRegistry: { products: () => import('../pages/Products/Products.jsx') }

步骤 3: 在 app.config.js 中添加菜单（如需导航入口）
        menuItems: [{ key: 'products', icon: '🏷️', label: '商品管理', path: '/products' }]
```

### 完整示例

**1. 创建页面**

```jsx
// src/pages/Products/Products.jsx
import React from 'react'

export default function Products() {
  return (
    <div>
      <h1 style={{ color: 'var(--color-text-bright)' }}>商品管理</h1>
      <p>这里放你的业务逻辑</p>
    </div>
  )
}
```

**2. 注册页面**

```js
// src/config/app.config.js
export const pageRegistry = {
  // ...existing...
  products: () => import('../pages/Products/Products.jsx'),
}
```

**3. 添加菜单（可选）**

```js
// src/config/app.config.js
export const menuItems = [
  {
    section: '业务',
    items: [
      // ...existing...
      { key: 'products', icon: '🏷️', label: '商品管理', path: '/products', roles: null },
    ]
  },
]
```

**完成。** 无需改任何路由代码或 JSX 组件。

### 带权限控制

```js
// menuItems 中设置 roles
{ key: 'adminPanel', path: '/admin', roles: ['admin', 'superadmin'] }

// 当前用户角色从 auth context 获取后，菜单会自动过滤
// (权限过滤逻辑在 Sidebar 组件中可根据需要扩展)
```

### 带 Mock 数据

```js
// src/mock/productsData.js
export const products = [
  { id: 1, name: '产品A', price: 99 },
  { id: 2, name: '产品B', price: 199 },
]

// 页面中 import
import { products } from '../../mock/productsData.js'
```

---

## 📦 配置文件一览

| 文件 | 作用 | 修改频率 |
|------|------|----------|
| `src/config/app.config.js` | **主配置**：项目名/Logo/菜单/布局/主题 | 🔴 定制时必改 |
| `.env` | 环境变量：Mock 开关/API 地址 | 🟡 部署时改 |
| `src/config/themes/*.js` | 主题 CSS 变量定义 | 🟢 偶尔 |
| `src/config/i18n/locales/*.js` | 语言翻译文本 | 🟢 偶尔 |
| `src/config/routes.js` | 路由自动生成逻辑 | ⚪ 基本不改 |
| `src/config/api.js` | API 适配层 | ⚪ 基本不改 |

---

## 🧪 最佳实践

### 开发流程

```bash
# 1. 修改 app.config.js → 定制菜单和品牌
# 2. 在 pages/ 下新建业务页面
# 3. 在 app.config.js 注册页面 + 添加菜单
# 4. 开发阶段：VITE_USE_MOCK=true → 用 Mock 数据
# 5. 联调阶段：VITE_USE_MOCK=false → 指定真实 API 地址
# 6. 发布：npm run build → dist/ 可直接部署
```

### 主题开发建议

- 使用 CSS 变量（不要硬编码颜色）→ 主题切换即生效
- 亮色主题不需要复刻暗色主题的所有效果（网格、粒子可适当精简）
- 新增主题 = 复制一份 `dark-tech.js` → 改值 → 注册 → 完成

### 页面开发建议

- 每个页面放在 `src/pages/<PageName>/` 下（组件 + CSS 放一起）
- 页面数据从 `src/mock/` import（开发阶段）
- 对接后端时只需把 import 换成 `api.get()` 调用
- 使用 `useI18n().t()` 做文本，方便后续翻译

### 性能建议

- `pageRegistry` 使用动态 `import()` → 代码自动分包，按需加载
- 大页面可进一步拆分子路由
- 主题切换用 `requestAnimationFrame` 批量更新 CSS 变量 → 无闪烁

---

## License

MIT

---

> 💡 **一句话总结**：Clone 后只改 `src/config/app.config.js` 一个文件，你就有了自己的后台管理系统。

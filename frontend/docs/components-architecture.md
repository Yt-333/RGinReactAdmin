# 如意后台管理系统 — 组件库架构设计

> 版本: 1.0 | 最后更新: 2026-07-14

## 一、现状问题

当前 `Dashboard.jsx` (185行) 内联了全部 UI 片段: 统计卡片、柱状图、订单表格、进度条、状态徽章、欢迎横幅。这些模式在后续页面（用户管理、订单管理、系统监控等）中必然重复出现，但缺乏复用机制。

核心矛盾: **每个页面都需要卡片/表格/图表/进度条，但这些都是写在页面 JSX 里的 div + className，不是真正的组件。**

## 二、分层策略

```
components/
├── ui/              ← 基础 UI 组件 (无业务语义, 可跨项目复用)
│   ├── Button/
│   ├── Card/
│   ├── Badge/
│   ├── Progress/
│   ├── Table/
│   ├── Chart/
│   └── Banner/
│
├── business/        ← 业务组件 (承载具体业务逻辑和数据结构)
│   ├── StatCard/
│   ├── OrderTable/
│   ├── SalesChart/
│   └── SystemStatus/
│
└── Layout/          ← 布局组件 (已有, 保持不变)
    ├── Layout.jsx
    ├── Header.jsx
    └── Sidebar.jsx
```

### 分界原则

| 维度 | 基础UI组件 | 业务组件 |
|------|-----------|---------|
| **依赖** | 仅依赖 React + CSS | 依赖基础UI组件 + mock/API 数据 |
| **语义** | 无业务含义 (Card 就是卡片) | 有明确业务含义 (StatCard = 统计卡片) |
| **复用范围** | 跨项目、跨页面 | 当前项目内跨页面 |
| **数据** | 通过 props 接收通用数据 | 接收定型数据结构 (如 `{title, value, change}`) |
| **示例** | `<Card>...</Card>` | `<StatCard title="用户数" value="12,846"/>` |

## 三、CSS 方案: 全局 CSS 变量 + CSS Modules

**选型理由**: 项目已有完备的 CSS 变量体系 (`index.css` 中 94 行变量)，覆盖颜色、阴影、玻璃拟态、动画。这是"设计 Token"层，应该保持全局。组件样式本身用 CSS Modules 做作用域隔离。

```
components/
└── ui/
    └── Button/
        ├── Button.jsx        ← 组件逻辑
        ├── Button.module.css ← 组件样式 (CSS Modules)
        └── index.js          ← barrel export
```

- **全局层** (`index.css`): 设计 Token（CSS 变量）、全局动画 keyframes、reset、滚动条
- **组件层** (`*.module.css`): 每个组件的局部样式，通过 `composes` 复用全局变量
- **页面层** (`pages/*/xxx.css`): 页面级布局样式（网格、间距），逐步迁移到 layout 组件

CSS Modules 在 Vite 中零配置开箱即用 (`*.module.css` 自动处理)。

## 四、目录结构总览

```
src/
├── components/
│   ├── ui/                       # 基础 UI 组件
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   └── index.js
│   │   ├── Card/
│   │   │   ├── Card.jsx
│   │   │   ├── Card.module.css
│   │   │   └── index.js
│   │   ├── Badge/
│   │   │   ├── Badge.jsx
│   │   │   ├── Badge.module.css
│   │   │   └── index.js
│   │   ├── Progress/
│   │   │   ├── Progress.jsx
│   │   │   ├── Progress.module.css
│   │   │   └── index.js
│   │   ├── Table/
│   │   │   ├── Table.jsx
│   │   │   ├── Table.module.css
│   │   │   └── index.js
│   │   ├── Chart/
│   │   │   ├── Chart.jsx
│   │   │   ├── Chart.module.css
│   │   │   └── index.js
│   │   └── Banner/
│   │       ├── Banner.jsx
│   │       ├── Banner.module.css
│   │       └── index.js
│   │
│   ├── business/                 # 业务组件
│   │   ├── StatCard/
│   │   │   ├── StatCard.jsx
│   │   │   ├── StatCard.module.css
│   │   │   └── index.js
│   │   ├── OrderTable/
│   │   │   ├── OrderTable.jsx
│   │   │   ├── OrderTable.module.css
│   │   │   └── index.js
│   │   ├── SalesChart/
│   │   │   ├── SalesChart.jsx
│   │   │   ├── SalesChart.module.css
│   │   │   └── index.js
│   │   └── SystemStatus/
│   │       ├── SystemStatus.jsx
│   │       ├── SystemStatus.module.css
│   │       └── index.js
│   │
│   └── Layout/                   # 布局 (已有)
│       ├── Layout.jsx
│       ├── Layout.css
│       ├── Header.jsx
│       ├── Sidebar.jsx
│       └── index.js
│
├── pages/
│   └── Dashboard/
│       ├── Dashboard.jsx         # 重构: 仅组合业务组件
│       └── Dashboard.css         # 页面级布局样式
│
├── mock/
│   └── dashboardData.js          # 保持不变
│
├── index.css                     # 全局 CSS 变量 + reset + keyframes
├── App.jsx
└── main.jsx
```

## 五、组件 Props API 设计

### 5.1 Button

```jsx
/**
 * @param {'primary'|'secondary'|'ghost'|'danger'} [variant='primary'] - 按钮变体
 * @param {'sm'|'md'|'lg'} [size='md'] - 按钮尺寸
 * @param {boolean} [loading=false] - 加载状态, 显示旋转图标
 * @param {boolean} [disabled=false] - 禁用状态
 * @param {React.ReactNode} [icon] - 前置图标
 * @param {React.ReactNode} children - 按钮文本
 * @param {React.ButtonHTMLAttributes} [props] - 透传原生 button 属性
 */
<Button variant="primary" size="md" loading={false} icon={<Icon/>}>
  提交
</Button>
```

### 5.2 Card — Compound Component 模式

```jsx
/**
 * Card 使用 Compound Components 组合模式:
 *   <Card> <Card.Header> <Card.Body> <Card.Footer>
 *
 * @param {boolean} [hoverable=false] - 是否启用 hover 3D 倾斜效果
 * @param {boolean} [glow=false] - 是否启用霓虹发光边框
 * @param {string} [className] - 额外类名
 * @param {React.CSSProperties} [style] - 内联样式
 * @param {React.ReactNode} children
 */

// 使用示例:
<Card hoverable glow>
  <Card.Header>
    <Card.Title>销售趋势</Card.Title>
    <Card.Action onClick={handleDetail}>查看详情 →</Card.Action>
  </Card.Header>
  <Card.Body>
    <SalesChart data={chartData} />
  </Card.Body>
</Card>
```

### 5.3 Badge

```jsx
/**
 * @param {'success'|'warning'|'danger'|'info'|'neutral'} [variant='neutral'] - 状态变体
 * @param {'sm'|'md'} [size='sm'] - 尺寸
 * @param {boolean} [dot=false] - 仅显示圆点, 无文字
 * @param {React.ReactNode} children - 徽章文本
 */
<Badge variant="success">已完成</Badge>
<Badge variant="danger" dot />
```

### 5.4 Progress

```jsx
/**
 * @param {number} value - 当前值 (0-100)
 * @param {number} [max=100] - 最大值
 * @param {string} [color] - 填充色 (CSS 颜色值), 默认使用 CSS 变量 --color-neon
 * @param {boolean} [showLabel=false] - 是否在右侧显示百分比数字
 * @param {string} [label] - 左侧描述文本
 * @param {'sm'|'md'|'lg'} [size='md'] - 进度条高度
 * @param {boolean} [animated=true] - 是否启用动画
 */
<Progress value={62} color="#F59E0B" showLabel label="内存使用率" />
```

### 5.5 Table — Compound Component + Render Props

```jsx
/**
 * Table 使用 Compound Components + Render Props:
 *   <Table> <Table.Head> <Table.Body> <Table.Row> <Table.Cell>
 *
 * 每一列通过 columns 配置驱动, 或使用 children 自由组合。
 *
 * @param {Column[]} [columns] - 列配置 (声明式模式)
 *   @param {string} columns[].key - 数据字段名
 *   @param {string} columns[].title - 列标题
 *   @param {(value, record, index) => ReactNode} [columns[].render] - 自定义渲染
 *   @param {string|number} [columns[].width] - 列宽
 * @param {object[]} [dataSource] - 数据源
 * @param {string} [rowKey='id'] - 行唯一键
 * @param {boolean} [striped=false] - 斑马纹
 * @param {boolean} [hoverable=true] - hover 行高亮
 * @param {React.ReactNode} [children] - 自由组合模式 (替代 columns+dataSource)
 */

// 声明式 (推荐):
<Table
  columns={[
    { key: 'id',    title: '订单号', width: 120 },
    { key: 'customer', title: '客户' },
    { key: 'status', title: '状态', render: (v) => <Badge variant={mapStatus(v)}>{v}</Badge> },
  ]}
  dataSource={orders}
  rowKey="id"
/>

// 自由组合模式 (需要完全自定义 DOM 结构时):
<Table>
  <Table.Head>
    <Table.Row>
      <Table.Cell header>订单号</Table.Cell>
      <Table.Cell header>客户</Table.Cell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {orders.map(o => (
      <Table.Row key={o.id}>
        <Table.Cell>{o.id}</Table.Cell>
        <Table.Cell>{o.customer}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

### 5.6 Chart (基础柱状图)

```jsx
/**
 * 通用柱状图 (纯展示, 不引入图表库)
 *
 * @param {ChartSeries[]} series - 系列数据
 *   @param {string} series[].key - 系列标识
 *   @param {string} series[].label - 系列名称 (图例)
 *   @param {string} series[].color - 柱体颜色
 *   @param {number} [series[].width=18] - 柱体宽度
 * @param {ChartDataPoint[]} data - 数据点
 *   @param {string} data[].label - X 轴标签
 *   @param {Record<string, number>} data[].values - 各系列的值
 * @param {number} [height=200] - 图表高度
 * @param {boolean} [showLegend=true] - 是否显示图例
 */
<Chart
  series={[
    { key: 'sales', label: '销售额', color: '#06b6d4' },
    { key: 'users', label: '新增用户', color: '#8b5cf6', width: 10 },
  ]}
  data={[
    { label: '1月', values: { sales: 4200, users: 380 } },
    { label: '2月', values: { sales: 3800, users: 420 } },
  ]}
  height={200}
/>
```

### 5.7 Banner (欢迎横幅)

```jsx
/**
 * 页面顶部横幅 (科技感渐变背景 + 粒子 + 扫描线)
 *
 * @param {string} greeting - 问候语 (如 "早上好，欢迎回来")
 * @param {string} title - 主标题
 * @param {string} [subtitle] - 副标题
 * @param {React.ReactNode} [decoration='☁️'] - 右侧装饰元素
 * @param {React.ReactNode} [children] - 横幅底部额外内容
 */
<Banner
  greeting={`${getGreeting()}，欢迎回来`}
  title="如意后台管理系统"
  subtitle="今天是美好的一天，祝您工作顺利、万事如意 ✨"
/>
```

### 5.8 业务组件: StatCard

```jsx
/**
 * 统计卡片 — 基于 Card + 3D 倾斜 + 光泽扫过
 *
 * @param {string} title - 指标标题 (如 "用户总数")
 * @param {string|number} value - 指标数值 (如 "12,846")
 * @param {string} [change] - 变化率 (如 "+12.5%")
 * @param {'up'|'down'} [changeType] - 变化方向
 * @param {React.ReactNode} icon - 图标 (emoji 或 SVG)
 * @param {string} [color='#3B82C4'] - 主题色
 */
<StatCard
  title="用户总数"
  value="12,846"
  change="+12.5%"
  changeType="up"
  icon="👥"
  color="#3B82C4"
/>
```

### 5.9 业务组件: OrderTable

```jsx
/**
 * 订单表格 — 基于 Table 组件 + 状态 Badge
 *
 * @param {Order[]} orders - 订单数据
 *   @param {string} orders[].id
 *   @param {string} orders[].customer
 *   @param {string} orders[].product
 *   @param {string} orders[].amount
 *   @param {string} orders[].status (已完成|处理中|已取消)
 *   @param {string} orders[].time
 * @param {boolean} [loading=false] - 加载状态
 * @param {() => void} [onViewAll] - 点击"全部订单"回调
 */
<OrderTable orders={recentOrders} onViewAll={() => navigate('/orders')} />
```

### 5.10 业务组件: SalesChart

```jsx
/**
 * 销售趋势图 — 基于 Chart 组件, 预设销售额+用户两个系列
 *
 * @param {SalesDataPoint[]} data - 月度数据
 *   @param {string} data[].month
 *   @param {number} data[].sales
 *   @param {number} data[].users
 * @param {() => void} [onViewDetail] - "查看详情"回调
 */
<SalesChart data={chartData} onViewDetail={() => navigate('/analytics')} />
```

### 5.11 业务组件: SystemStatus

```jsx
/**
 * 系统状态面板 — 基于 Card + Progress 组件
 *
 * @param {SystemStatusItem[]} items - 状态项
 *   @param {string} items[].label - 指标名称
 *   @param {number} items[].value - 百分比 (0-100)
 *   @param {string} items[].color - 进度条颜色
 * @param {() => void} [onRefresh] - 刷新回调
 */
<SystemStatus items={systemStatus} onRefresh={handleRefresh} />
```

## 六、组件组合模式总结

| 模式 | 适用场景 | 示例 |
|------|---------|------|
| **Compound Components** | 有固定结构但内容灵活的区域 | `<Card><Card.Header/><Card.Body/></Card>` |
| **Render Props / columns render** | 列表/表格中的单元格自定义渲染 | `columns[].render: (value) => <Badge>{value}</Badge>` |
| **Props 驱动** | 简单展示型组件, 数据进 → UI 出 | `<Badge variant="success">已完成</Badge>` |
| **children 插槽** | 容器型组件, 内容完全由父组件决定 | `<Button icon={<Icon/>}>提交</Button>` |

## 七、组件文档与 Story 结构建议

### 7.1 文档结构

```
docs/
├── components-architecture.md    ← 本文件, 架构总览
├── components/
│   ├── ui/
│   │   ├── button.mdx            ← 每个组件的文档页
│   │   ├── card.mdx
│   │   ├── badge.mdx
│   │   ├── progress.mdx
│   │   ├── table.mdx
│   │   ├── chart.mdx
│   │   └── banner.mdx
│   └── business/
│       ├── stat-card.mdx
│       ├── order-table.mdx
│       ├── sales-chart.mdx
│       └── system-status.mdx
└── CHANGELOG.md
```

### 7.2 单组件文档模板 (以 Button 为例)

```mdx
---
name: Button
group: UI
---
import { Button } from '@/components/ui/Button'
import { Playground, Props } from '@/docs/components'

# Button 按钮

触发业务操作的基础交互元素。

## 基础用法

<Playground>
  <Button variant="primary">主要按钮</Button>
  <Button variant="secondary">次要按钮</Button>
  <Button variant="ghost">幽灵按钮</Button>
  <Button variant="danger">危险按钮</Button>
</Playground>

## 加载状态

<Playground>
  <Button loading>保存中</Button>
  <Button loading variant="secondary">提交中</Button>
</Playground>

## 尺寸

<Playground>
  <Button size="sm">小按钮</Button>
  <Button size="md">中按钮</Button>
  <Button size="lg">大按钮</Button>
</Playground>

## API

<Props of={Button} />
```

### 7.3 Storybook 集成 (可选, 后续引入)

```bash
npx storybook@latest init --type react --builder vite
```

Stories 结构与组件同目录:

```
components/ui/Button/
├── Button.jsx
├── Button.module.css
├── Button.stories.jsx    ← Storybook story
└── index.js
```

```jsx
// Button.stories.jsx
export default { title: 'UI/Button', component: Button }

export const Primary = () => <Button variant="primary">主要</Button>
export const Loading = () => <Button loading>加载中</Button>
export const AllVariants = () => (
  <div style={{ display: 'flex', gap: 12 }}>
    <Button variant="primary">主要</Button>
    <Button variant="secondary">次要</Button>
    <Button variant="ghost">幽灵</Button>
    <Button variant="danger">危险</Button>
  </div>
)
```

### 7.4 轻量替代: 组件预览页 (如果暂时不引入 Storybook)

在开发环境添加路由 `/dev/components`，渲染一个 ComponentGallery 页面:

```jsx
// pages/ComponentGallery/ComponentGallery.jsx
export default function ComponentGallery() {
  return (
    <div>
      <section>
        <h2>Button</h2>
        <Button variant="primary">主要</Button>
        <Button variant="secondary">次要</Button>
        <Button loading>加载中</Button>
      </section>
      <section>
        <h2>Badge</h2>
        <Badge variant="success">已完成</Badge>
        <Badge variant="danger">已取消</Badge>
      </section>
      {/* ... 其他组件 ... */}
    </div>
  )
}
```

## 八、迁移路径

```
阶段 1 (当前):  创建所有基础 UI 组件 + CSS Modules 样式
阶段 2:        基于 UI 组件构建业务组件 (StatCard/OrderTable/SalesChart/SystemStatus)
阶段 3:        重构 Dashboard.jsx — 用业务组件替换内联代码
阶段 4:        其他页面复用组件 (用户管理用 Table、系统监控用 Progress 等)
阶段 5:        引入 Storybook / 完善文档
```

## 九、核心原则

1. **Props 优先, children 补充**: 能用 props 描述的尽量用 props, 需要完全自由度的开放 children
2. **CSS Modules 不穿透**: 组件不依赖父级/页面的 CSS 类名, 完全自包含
3. **基础组件不引入业务类型**: `Table` 的 columns 是泛型, `OrderTable` 才定义具体列
4. **一个组件一个职责**: `Card` 只管容器样式, 不管里面是什么; `StatCard` 才管统计数据的展示
5. **渐进迁移**: 先建组件, 再替换页面代码, 每一步都可验证

/**
 * 仪表盘数据服务
 * 
 * Mock 数据在此定义。
 * 对接真实 API 时，替换 getDashboardData / getOrders 等函数的实现。
 * 组件层不感知数据来源 — 始终调用 service 层方法。
 */

import { get, useMock } from './api'

// ── Mock 数据（仅开发阶段使用） ──
const mockStats = [
  { key: 'users', title: '用户总数', value: '12,846', change: '+12.5%', changeType: 'up', icon: '👥', color: '#3B82C4' },
  { key: 'orders', title: '本月订单', value: '3,421', change: '+8.2%', changeType: 'up', icon: '📦', color: '#10B981' },
  { key: 'revenue', title: '营收总额', value: '¥ 892,450', change: '+23.1%', changeType: 'up', icon: '💰', color: '#F59E0B' },
  { key: 'visits', title: '页面访问', value: '56,230', change: '-3.8%', changeType: 'down', icon: '📈', color: '#8B5CF6' },
]

const mockOrders = [
  { id: '#1001', customer: '张伟', product: '企业版授权', amount: '¥ 12,800', status: '已完成', time: '10 分钟前' },
  { id: '#1002', customer: '李娜', product: '专业版订阅', amount: '¥ 3,600', status: '处理中', time: '25 分钟前' },
  { id: '#1003', customer: '王磊', product: '基础版套餐', amount: '¥ 1,280', status: '已完成', time: '1 小时前' },
  { id: '#1004', customer: '赵敏', product: '企业版授权', amount: '¥ 12,800', status: '已取消', time: '2 小时前' },
  { id: '#1005', customer: '陈刚', product: '专业版订阅', amount: '¥ 3,600', status: '已完成', time: '3 小时前' },
]

const mockChart = [
  { month: '1月', sales: 4200, users: 380 },
  { month: '2月', sales: 3800, users: 420 },
  { month: '3月', sales: 5100, users: 510 },
  { month: '4月', sales: 4600, users: 490 },
  { month: '5月', sales: 5800, users: 620 },
  { month: '6月', sales: 7200, users: 780 },
  { month: '7月', sales: 6800, users: 850 },
]

const mockStatus = [
  { label: 'CPU 使用率', value: 34, color: '#10B981' },
  { label: '内存使用率', value: 62, color: '#F59E0B' },
  { label: '磁盘占用', value: 48, color: '#3B82C4' },
  { label: '网络带宽', value: 27, color: '#10B981' },
]

// ── 公开 API ──

/** 获取仪表盘统计卡片数据 */
export async function fetchStats() {
  if (useMock) return { data: mockStats }
  return get('/dashboard/stats')
}

/** 获取近期订单 */
export async function fetchOrders() {
  if (useMock) return { data: mockOrders }
  return get('/dashboard/orders')
}

/** 获取趋势图数据 */
export async function fetchChartData() {
  if (useMock) return { data: mockChart }
  return get('/dashboard/chart')
}

/** 获取系统状态 */
export async function fetchSystemStatus() {
  if (useMock) return { data: mockStatus }
  return get('/dashboard/status')
}

/** 获取仪表盘全部数据（一次请求） */
export async function fetchDashboardAll() {
  if (useMock) {
    return {
      stats: mockStats,
      orders: mockOrders,
      chart: mockChart,
      status: mockStatus,
    }
  }
  return get('/dashboard')
}

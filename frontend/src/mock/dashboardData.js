/**
 * Mock 数据 — 后续对接后端 API 时替换
 */
export const statsCards = [
  {
    key: 'users',
    title: '用户总数',
    value: '12,846',
    change: '+12.5%',
    changeType: 'up',
    icon: '👥',
    color: '#3B82C4',
  },
  {
    key: 'orders',
    title: '本月订单',
    value: '3,421',
    change: '+8.2%',
    changeType: 'up',
    icon: '📦',
    color: '#10B981',
  },
  {
    key: 'revenue',
    title: '营收总额',
    value: '¥ 892,450',
    change: '+23.1%',
    changeType: 'up',
    icon: '💰',
    color: '#F59E0B',
  },
  {
    key: 'visits',
    title: '页面访问',
    value: '56,230',
    change: '-3.8%',
    changeType: 'down',
    icon: '📈',
    color: '#8B5CF6',
  },
]

export const recentOrders = [
  { id: '#1001', customer: '张伟', product: '企业版授权', amount: '¥ 12,800', status: '已完成', time: '10 分钟前' },
  { id: '#1002', customer: '李娜', product: '专业版订阅', amount: '¥ 3,600', status: '处理中', time: '25 分钟前' },
  { id: '#1003', customer: '王磊', product: '基础版套餐', amount: '¥ 1,280', status: '已完成', time: '1 小时前' },
  { id: '#1004', customer: '赵敏', product: '企业版授权', amount: '¥ 12,800', status: '已取消', time: '2 小时前' },
  { id: '#1005', customer: '陈刚', product: '专业版订阅', amount: '¥ 3,600', status: '已完成', time: '3 小时前' },
]

export const chartData = [
  { month: '1月', sales: 4200, users: 380 },
  { month: '2月', sales: 3800, users: 420 },
  { month: '3月', sales: 5100, users: 510 },
  { month: '4月', sales: 4600, users: 490 },
  { month: '5月', sales: 5800, users: 620 },
  { month: '6月', sales: 7200, users: 780 },
  { month: '7月', sales: 6800, users: 850 },
]

export const systemStatus = [
  { label: 'CPU 使用率', value: 34, color: '#10B981' },
  { label: '内存使用率', value: 62, color: '#F59E0B' },
  { label: '磁盘占用', value: 48, color: '#3B82C4' },
  { label: '网络带宽', value: 27, color: '#10B981' },
]

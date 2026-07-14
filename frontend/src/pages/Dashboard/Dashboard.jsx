/**
 * Dashboard — 仪表盘首页
 * 
 * 全部使用组件库：Card, Banner, StatCard, SalesChart, SystemStatus, OrderTable
 * 数据通过 service 层获取
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Banner from '../../components/ui/Banner'
import StatCard from '../../components/business/StatCard'
import SalesChart from '../../components/business/SalesChart'
import SystemStatus from '../../components/business/SystemStatus'
import OrderTable from '../../components/business/OrderTable'
import { fetchDashboardAll } from '../../services/dashboardService'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardAll().then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [])

  if (loading || !data) {
    return <div className="dashboard"><div className="dashboard-loading">加载中...</div></div>
  }

  const getGreeting = () => {
    const h = new Date().getHours()
    if (h < 6) return '夜深了'
    if (h < 9) return '早上好'
    if (h < 12) return '上午好'
    if (h < 14) return '中午好'
    if (h < 18) return '下午好'
    return '晚上好'
  }

  return (
    <div className="dashboard stagger-entrance">
      {/* 欢迎横幅（使用 Banner 组件） */}
      <Banner
        greeting={`${getGreeting()}，欢迎回来`}
        title="如意后台管理系统"
        subtitle="今天是美好的一天，祝您工作顺利、万事如意 ✨"
      />

      {/* 统计卡片 */}
      <div className="stats-grid">
        {data.stats.map(({ key, ...card }) => (
          <StatCard key={key} {...card} />
        ))}
      </div>

      {/* 内容面板 */}
      <div className="dashboard-content">
        {/* 销售趋势 */}
        <Card glow>
          <Card.Header>
            <Card.Title>销售趋势</Card.Title>
            <Card.Action onClick={() => navigate('/analytics')}>查看详情 →</Card.Action>
          </Card.Header>
          <Card.Body>
            <SalesChart data={data.chart} />
          </Card.Body>
        </Card>

        {/* 系统状态 */}
        <Card glow>
          <Card.Header>
            <Card.Title>系统状态</Card.Title>
            <Card.Action onClick={() => {}}>刷新</Card.Action>
          </Card.Header>
          <Card.Body>
            <SystemStatus items={data.status} />
          </Card.Body>
        </Card>

        {/* 近期订单 */}
        <Card className="dashboard-panel-full" glow>
          <Card.Header>
            <Card.Title>近期订单</Card.Title>
            <Card.Action onClick={() => navigate('/orders')}>全部订单 →</Card.Action>
          </Card.Header>
          <Card.Body style={{ padding: 0 }}>
            <OrderTable orders={data.orders} />
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

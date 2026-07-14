import React from 'react'
import { statsCards, recentOrders, chartData, systemStatus } from '../../mock/dashboardData'
import './Dashboard.css'

export default function Dashboard() {
  const getGreeting = () => {
    const h = new Date().getHours()
    if (h < 6) return '夜深了'
    if (h < 9) return '早上好'
    if (h < 12) return '上午好'
    if (h < 14) return '中午好'
    if (h < 18) return '下午好'
    return '晚上好'
  }

  const maxSales = Math.max(...chartData.map(d => d.sales))

  const statusLabel = (s) => {
    if (s === '已完成') return 'done'
    if (s === '处理中') return 'processing'
    return 'cancelled'
  }

  /* 1. 统计卡片 3D 倾斜 — 鼠标位置映射 rotateX/Y */
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    // 相对卡片中心的位置，归一化到 [-1, 1]
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    // 最大倾斜角度 ±8deg
    const rotateY =  x * 8
    const rotateX = -y * 8
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div className="dashboard stagger-entrance">
      {/* 欢迎横幅 */}
      <div className="dashboard-banner">
        <div className="dashboard-banner-greeting">{getGreeting()}，欢迎回来</div>
        <div className="dashboard-banner-title">如意后台管理系统</div>
        <div className="dashboard-banner-subtitle">
          今天是美好的一天，祝您工作顺利、万事如意 ✨
        </div>
        <div className="dashboard-banner-decoration">☁️</div>
      </div>

      {/* 统计卡片 */}
      <div className="stats-grid">
        {statsCards.map((card) => (
          <div
            className="stat-card"
            key={card.key}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            {/* 1. 光泽扫过遮罩 */}
            <div className="shine-overlay" />

            <div className="stat-card-header">
              <span className="stat-card-title">{card.title}</span>
              <span
                className="stat-card-icon"
                style={{ background: `${card.color}15`, color: card.color }}
              >
                {card.icon}
              </span>
            </div>
            <div className="stat-card-value">{card.value}</div>
            <div className={`stat-card-change ${card.changeType}`}>
              {card.changeType === 'up' ? '▲' : '▼'} {card.change} 较上月
            </div>
          </div>
        ))}
      </div>

      {/* 内容双栏 */}
      <div className="dashboard-content">
        {/* 趋势图 */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <span className="panel-title">销售趋势</span>
            <button className="panel-action">查看详情 →</button>
          </div>
          <div className="panel-body">
            <div className="bar-chart">
              {chartData.map((d) => (
                <div className="bar-group" key={d.month}>
                  <div
                    className="bar-item sales"
                    style={{ height: `${(d.sales / maxSales) * 160}px` }}
                  />
                  <div
                    className="bar-item users"
                    style={{ height: `${(d.users / 850) * 100}px` }}
                  />
                  <span className="bar-label">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="bar-legend">
              <div className="bar-legend-item">
                <span className="bar-legend-dot sales" /> 销售额
              </div>
              <div className="bar-legend-item">
                <span className="bar-legend-dot users" /> 新增用户
              </div>
            </div>
          </div>
        </div>

        {/* 系统状态 */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <span className="panel-title">系统状态</span>
            <button className="panel-action">刷新</button>
          </div>
          <div className="panel-body">
            <div className="status-list">
              {systemStatus.map((item) => (
                <div className="status-item" key={item.label}>
                  <span className="status-item-label">{item.label}</span>
                  <div className="status-item-bar">
                    <div
                      className="status-item-fill"
                      style={{
                        width: `${item.value}%`,
                        background: item.color,
                        '--fill-color': item.color,
                      }}
                    />
                  </div>
                  <span className="status-item-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 近期订单 */}
        <div className="dashboard-panel full">
          <div className="panel-header">
            <span className="panel-title">近期订单</span>
            <button className="panel-action">全部订单 →</button>
          </div>
          <div className="panel-body" style={{ padding: 0 }}>
            <table className="order-table">
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>客户</th>
                  <th>产品</th>
                  <th>金额</th>
                  <th>状态</th>
                  <th>时间</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td><span className="order-id">{o.id}</span></td>
                    <td>{o.customer}</td>
                    <td>{o.product}</td>
                    <td>{o.amount}</td>
                    <td>
                      <span className={`status-badge ${statusLabel(o.status)}`}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--color-text-light)', fontSize: 12 }}>{o.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

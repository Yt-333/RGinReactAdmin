/**
 * 组件预览页 — 开发环境专用
 * 路由: /dev/components
 *
 * 展示所有 UI 基础组件和业务组件的用法示例
 */
import React from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Progress from '../../components/ui/Progress'
import Table from '../../components/ui/Table'
import Chart from '../../components/ui/Chart'
import Banner from '../../components/ui/Banner'
import StatCard from '../../components/business/StatCard'
import SystemStatus from '../../components/business/SystemStatus'

const sectionStyle = { marginBottom: 32 }
const h2Style = { fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--color-text-bright)', marginBottom: 12 }
const rowStyle = { display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }

export default function ComponentGallery() {
  return (
    <div style={{ padding: 40, overflow: 'auto', height: '100%' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--color-neon)', marginBottom: 32 }}>
        🧩 组件预览
      </h1>

      {/* ======== Button ======== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Button 按钮</h2>
        <div style={rowStyle}>
          <Button variant="primary">主要按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="ghost">幽灵按钮</Button>
          <Button variant="danger">危险按钮</Button>
          <Button loading>加载中</Button>
          <Button disabled>已禁用</Button>
        </div>
        <div style={{ ...rowStyle, marginTop: 8 }}>
          <Button size="sm">小</Button>
          <Button size="md">中</Button>
          <Button size="lg">大</Button>
        </div>
      </section>

      {/* ======== Badge ======== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Badge 徽章</h2>
        <div style={rowStyle}>
          <Badge variant="success">已完成</Badge>
          <Badge variant="warning">处理中</Badge>
          <Badge variant="danger">已取消</Badge>
          <Badge variant="info">新订单</Badge>
          <Badge variant="neutral">草稿</Badge>
          <Badge variant="success" dot />
          <Badge variant="danger" dot />
        </div>
      </section>

      {/* ======== Progress ======== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Progress 进度条</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 500 }}>
          <Progress value={34} color="#10B981" showLabel label="CPU 使用率" />
          <Progress value={62} color="#F59E0B" showLabel label="内存使用率" />
          <Progress value={85} color="#EF4444" showLabel label="磁盘占用" size="sm" />
          <Progress value={45} showLabel size="lg" />
        </div>
      </section>

      {/* ======== Table ======== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Table 表格</h2>
        <Card>
          <Table
            columns={[
              { key: 'id', title: '订单号', width: 120, render: (v) => <span style={{ color: 'var(--color-neon)', fontFamily: 'var(--font-mono)' }}>{v}</span> },
              { key: 'customer', title: '客户' },
              { key: 'amount', title: '金额' },
              { key: 'status', title: '状态', render: (v) => <Badge variant={v === '已完成' ? 'success' : 'warning'}>{v}</Badge> },
            ]}
            dataSource={[
              { id: '#1001', customer: '张伟', amount: '¥ 12,800', status: '已完成' },
              { id: '#1002', customer: '李娜', amount: '¥ 3,600', status: '处理中' },
              { id: '#1003', customer: '王磊', amount: '¥ 1,280', status: '已完成' },
            ]}
            rowKey="id"
            hoverable
          />
        </Card>
      </section>

      {/* ======== Chart ======== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Chart 柱状图</h2>
        <Card>
          <Card.Body>
            <Chart
              series={[
                { key: 'sales', label: '销售额', color: '#06b6d4' },
                { key: 'users', label: '新增用户', color: '#8b5cf6', width: 10 },
              ]}
              data={[
                { label: '1月', values: { sales: 4200, users: 380 } },
                { label: '2月', values: { sales: 3800, users: 420 } },
                { label: '3月', values: { sales: 5100, users: 510 } },
                { label: '4月', values: { sales: 4600, users: 490 } },
                { label: '5月', values: { sales: 5800, users: 620 } },
              ]}
            />
          </Card.Body>
        </Card>
      </section>

      {/* ======== Card + 业务组件 ======== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Card 卡片 (Compound)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Card hoverable glow>
            <Card.Header>
              <Card.Title>带标题的卡片</Card.Title>
              <Card.Action>操作 →</Card.Action>
            </Card.Header>
            <Card.Body>
              <SystemStatus
                items={[
                  { label: 'CPU', value: 34, color: '#10B981' },
                  { label: '内存', value: 62, color: '#F59E0B' },
                ]}
              />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <div style={{ color: 'var(--color-text-secondary)' }}>
                这是无标题的纯内容卡片
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* ======== StatCard ======== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>StatCard 统计卡片</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <StatCard title="用户总数" value="12,846" change="+12.5%" changeType="up" icon="👥" color="#3B82C4" />
          <StatCard title="本月订单" value="3,421" change="+8.2%" changeType="up" icon="📦" color="#10B981" />
          <StatCard title="页面访问" value="56,230" change="-3.8%" changeType="down" icon="📈" color="#8B5CF6" />
        </div>
      </section>

      {/* ======== Banner ======== */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Banner 横幅</h2>
        <Banner
          greeting="下午好，欢迎回来"
          title="如意后台管理系统"
          subtitle="这是组件预览页面 🧩"
        />
      </section>
    </div>
  )
}

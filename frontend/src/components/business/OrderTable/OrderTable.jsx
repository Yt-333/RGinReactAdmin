import React from 'react'
import Table from '../../ui/Table'
import Badge from '../../ui/Badge'

/**
 * 订单表格 — 基于 Table 的声明式列配置，状态列自动映射 Badge
 *
 * @param {Order[]} orders - 订单数据
 *   @param {string} orders[].id - 订单号
 *   @param {string} orders[].customer - 客户名称
 *   @param {string} orders[].product - 产品名称
 *   @param {string} orders[].amount - 金额 (如 "¥ 12,800")
 *   @param {'已完成'|'处理中'|'已取消'} orders[].status - 订单状态
 *   @param {string} orders[].time - 时间描述 (如 "10 分钟前")
 * @param {boolean} [loading=false] - 加载中
 * @param {() => void} [onViewAll] - "全部订单" 点击回调
 * @param {string} [className] - 额外类名
 *
 * @example
 * <OrderTable orders={recentOrders} onViewAll={() => navigate('/orders')} />
 */
export default function OrderTable({ orders, loading = false, onViewAll, className = '' }) {
  /**
   * 状态 → Badge variant 映射
   */
  const statusVariant = (status) => {
    if (status === '已完成') return 'success'
    if (status === '处理中') return 'warning'
    return 'danger'
  }

  const columns = [
    {
      key: 'id',
      title: '订单号',
      render: (v) => <span style={{ color: 'var(--color-neon)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{v}</span>,
    },
    { key: 'customer', title: '客户' },
    { key: 'product', title: '产品' },
    { key: 'amount', title: '金额' },
    {
      key: 'status',
      title: '状态',
      render: (v) => <Badge variant={statusVariant(v)}>{v}</Badge>,
    },
    {
      key: 'time',
      title: '时间',
      render: (v) => <span style={{ color: 'var(--color-text-dim)', fontSize: 12 }}>{v}</span>,
    },
  ]

  return (
    <div className={className}>
      <Table columns={columns} dataSource={orders} rowKey="id" hoverable />
    </div>
  )
}

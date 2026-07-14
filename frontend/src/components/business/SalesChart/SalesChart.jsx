import React from 'react'
import Chart from '../../ui/Chart'

/**
 * 销售趋势图 — 基于 Chart 组件，预设销售额 + 新增用户双系列
 *
 * @param {SalesDataPoint[]} data - 月度数据
 *   @param {string} data[].month - 月份 (如 "1月")
 *   @param {number} data[].sales - 销售额
 *   @param {number} data[].users - 新增用户数
 * @param {() => void} [onViewDetail] - "查看详情" 点击回调
 * @param {string} [className] - 额外类名
 *
 * @example
 * <SalesChart data={chartData} onViewDetail={() => navigate('/analytics')} />
 */
export default function SalesChart({ data, onViewDetail, className = '' }) {
  const series = [
    { key: 'sales', label: '销售额', color: '#06b6d4' },
    { key: 'users', label: '新增用户', color: '#8b5cf6', width: 10 },
  ]

  const chartData = data.map((d) => ({
    label: d.month,
    values: { sales: d.sales, users: d.users },
  }))

  return (
    <div className={className}>
      <Chart series={series} data={chartData} height={200} />
    </div>
  )
}

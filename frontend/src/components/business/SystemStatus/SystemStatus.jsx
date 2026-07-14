import React from 'react'
import Progress from '../../ui/Progress'

/**
 * 系统状态面板 — 多进度条列表
 *
 * @param {SystemStatusItem[]} items - 状态项
 *   @param {string} items[].label - 指标名称 (如 "CPU 使用率")
 *   @param {number} items[].value - 百分比值 (0-100)
 *   @param {string} items[].color - 进度条颜色
 * @param {() => void} [onRefresh] - 刷新回调
 * @param {string} [className] - 额外类名
 *
 * @example
 * <SystemStatus items={systemStatus} onRefresh={handleRefresh} />
 */
export default function SystemStatus({ items, onRefresh, className = '' }) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {items.map((item) => (
        <Progress
          key={item.label}
          label={item.label}
          value={item.value}
          color={item.color}
          showLabel
          size="md"
        />
      ))}
    </div>
  )
}

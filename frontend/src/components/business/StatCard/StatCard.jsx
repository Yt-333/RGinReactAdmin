import React, { useCallback } from 'react'
import Card from '../../ui/Card'
import styles from './StatCard.module.css'

/**
 * 统计卡片 — 仪表盘核心指标展示
 *
 * 基于 Card (hoverable+glow) + 3D 倾斜 + 光泽扫过
 *
 * @param {string} title - 指标标题 (如 "用户总数")
 * @param {string|number} value - 指标数值 (如 "12,846")
 * @param {string} [change] - 环比变化 (如 "+12.5%")
 * @param {'up'|'down'} [changeType] - 变化方向 (up=绿色, down=红色)
 * @param {React.ReactNode} icon - 图标 (emoji / SVG)
 * @param {string} [color='#3B82C4'] - 主题色 (图标背景 + 进度条高亮)
 * @param {string} [className] - 额外类名
 *
 * @example
 * <StatCard
 *   title="用户总数" value="12,846" change="+12.5%"
 *   changeType="up" icon="👥" color="#3B82C4"
 * />
 */
export default function StatCard({
  title,
  value,
  change,
  changeType,
  icon,
  color = '#3B82C4',
  className = '',
}) {
  // 3D 倾斜
  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`
  }, [])

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }, [])

  return (
    <div
      className={`${styles.card} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.shine} />
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.icon} style={{ background: `${color}15`, color }}>
          {icon}
        </span>
      </div>
      <div className={styles.value}>{value}</div>
      {change && (
        <div className={`${styles.change} ${changeType === 'up' ? styles.up : styles.down}`}>
          {changeType === 'up' ? '▲' : '▼'} {change} 较上月
        </div>
      )}
    </div>
  )
}

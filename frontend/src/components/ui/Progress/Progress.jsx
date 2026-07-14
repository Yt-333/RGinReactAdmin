import React from 'react'
import styles from './Progress.module.css'

/**
 * 进度条 — 带霓虹发光动画和内部光泽流动
 *
 * @param {number} value - 当前值 (0-100)
 * @param {number} [max=100] - 最大值
 * @param {string} [color] - 填充色 (CSS 颜色值), 默认使用 --color-neon
 * @param {boolean} [showLabel=false] - 是否在右侧显示百分比数字
 * @param {string} [label] - 左侧描述文本
 * @param {'sm'|'md'|'lg'} [size='md'] - 进度条高度 (sm=4px, md=8px, lg=12px)
 * @param {boolean} [animated=true] - 是否启用动画
 * @param {string} [className] - 额外类名
 *
 * @example
 * <Progress value={62} color="#F59E0B" showLabel label="内存使用率" />
 * <Progress value={34} color="#10B981" />
 */
export default function Progress({
  value,
  max = 100,
  color,
  showLabel = false,
  label,
  size = 'md',
  animated = true,
  className = '',
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  const fillStyle = {
    width: `${pct}%`,
    ...(color ? { background: color, '--fill-color': color } : {}),
  }

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={`${styles.track} ${styles[size]}`}>
        <div
          className={`${styles.fill} ${animated ? styles.animated : ''}`}
          style={fillStyle}
        />
      </div>
      {showLabel && <span className={styles.value}>{Math.round(pct)}%</span>}
    </div>
  )
}

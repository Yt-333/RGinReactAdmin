import React from 'react'
import styles from './Badge.module.css'

/**
 * 状态徽章 — 轻量标签，用于订单状态、角色标识等场景
 *
 * @param {'success'|'warning'|'danger'|'info'|'neutral'} [variant='neutral'] - 状态变体
 * @param {'sm'|'md'} [size='sm'] - 尺寸
 * @param {boolean} [dot=false] - 纯圆点模式，不渲染文字
 * @param {React.ReactNode} children - 徽章文本（dot 模式下忽略）
 * @param {string} [className] - 额外类名
 *
 * @example
 * <Badge variant="success">已完成</Badge>
 * <Badge variant="danger" dot />
 */
export default function Badge({
  variant = 'neutral',
  size = 'sm',
  dot = false,
  children,
  className = '',
}) {
  const cls = [
    styles.badge,
    styles[variant],
    styles[size],
    dot ? styles.dot : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <span className={cls}>{dot ? '' : children}</span>
}

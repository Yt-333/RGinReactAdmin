import React from 'react'
import styles from './Banner.module.css'

/**
 * 欢迎横幅 — 科技感渐变背景 + 浮动粒子 + 扫描线
 *
 * @param {string} greeting - 问候语 (如 "早上好，欢迎回来")
 * @param {string} title - 主标题 (渐变霓虹文字)
 * @param {string} [subtitle] - 副标题
 * @param {React.ReactNode} [decoration='☁️'] - 右侧装饰 (emoji / 图标)
 * @param {React.ReactNode} [children] - 横幅底部额外内容
 * @param {string} [className] - 额外类名
 *
 * @example
 * <Banner greeting="早上好，欢迎回来" title="如意后台管理系统" />
 */
export default function Banner({
  greeting,
  title,
  subtitle,
  decoration = '☁️',
  children,
  className = '',
}) {
  return (
    <div className={`${styles.banner} ${className}`}>
      <div className={styles.greeting}>{greeting}</div>
      <div className={styles.title}>{title}</div>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      <div className={styles.decoration}>{decoration}</div>
      {children && <div className={styles.extra}>{children}</div>}
    </div>
  )
}

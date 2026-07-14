import React from 'react'
import styles from './Button.module.css'

/**
 * 通用按钮组件 — 支持 4 种变体、3 种尺寸、加载态、禁用态、前置图标
 *
 * @param {'primary'|'secondary'|'ghost'|'danger'} [variant='primary'] - 按钮变体
 * @param {'sm'|'md'|'lg'} [size='md'] - 按钮尺寸
 * @param {boolean} [loading=false] - 加载中，显示旋转图标并禁用点击
 * @param {boolean} [disabled=false] - 禁用状态
 * @param {React.ReactNode} [icon] - 前置图标元素
 * @param {React.ReactNode} children - 按钮文本
 * @param {string} [className] - 额外类名
 * @param {React.ButtonHTMLAttributes} [props] - 透传 button 原生属性
 *
 * @example
 * <Button variant="primary" icon={<SomeIcon />}>提交</Button>
 * <Button variant="danger" size="sm" loading>删除中</Button>
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  children,
  className = '',
  ...props
}) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    loading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={cls} disabled={disabled || loading} {...props}>
      {loading && <span className={styles.spinner} />}
      {!loading && icon && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.label}>{children}</span>}
    </button>
  )
}

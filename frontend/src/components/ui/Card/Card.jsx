import React, { useCallback } from 'react'
import styles from './Card.module.css'

/**
 * 通用卡片容器 — 玻璃拟态 + hover 3D 倾斜 + 霓虹边框
 *
 * Compound Components: <Card> <Card.Header> <Card.Body> <Card.Footer>
 *
 * @param {boolean} [hoverable=false] - 鼠标悬停时启用 3D 倾斜效果
 * @param {boolean} [glow=false] - 启用霓虹发光动画
 * @param {string} [className] - 额外类名
 * @param {React.CSSProperties} [style] - 内联样式
 * @param {React.ReactNode} children
 *
 * @example
 * <Card hoverable glow>
 *   <Card.Header>
 *     <Card.Title>标题</Card.Title>
 *     <Card.Action onClick={fn}>操作 →</Card.Action>
 *   </Card.Header>
 *   <Card.Body>内容</Card.Body>
 * </Card>
 */
function Card({ hoverable = false, glow = false, className = '', style, children }) {
  const cls = [
    styles.card,
    hoverable ? styles.hoverable : '',
    glow ? styles.glow : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // 3D 倾斜
  const handleMouseMove = useCallback(
    (e) => {
      if (!hoverable) return
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`
    },
    [hoverable]
  )

  const handleMouseLeave = useCallback((e) => {
    if (!hoverable) return
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }, [hoverable])

  return (
    <div
      className={cls}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {hoverable && <div className={styles.shine} />}
      {children}
    </div>
  )
}

/** 卡片顶部区域 — flex between 布局，通常放 Title + Action */
function Header({ children, className = '' }) {
  return <div className={`${styles.header} ${className}`}>{children}</div>
}

/** 卡片标题 — 衬线字体，高亮色 */
function Title({ children }) {
  return <span className={styles.title}>{children}</span>
}

/** 卡片右上操作链接 — 霓虹色 hover */
function Action({ children, onClick }) {
  return (
    <button className={styles.action} onClick={onClick}>
      {children}
    </button>
  )
}

/** 卡片内容区 — 默认 padding */
function Body({ children, className = '', style }) {
  return (
    <div className={`${styles.body} ${className}`} style={style}>
      {children}
    </div>
  )
}

/** 卡片底部区域 */
function Footer({ children, className = '' }) {
  return <div className={`${styles.footer} ${className}`}>{children}</div>
}

Card.Header = Header
Card.Title = Title
Card.Action = Action
Card.Body = Body
Card.Footer = Footer

export default Card

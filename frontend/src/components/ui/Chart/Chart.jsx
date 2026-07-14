import React from 'react'
import styles from './Chart.module.css'

/**
 * 通用柱状图 (纯 CSS 实现, 不引入图表库)
 *
 * @param {ChartSeries[]} series - 系列配置
 *   @param {string} series[].key - 系列标识
 *   @param {string} series[].label - 系列名称 (图例)
 *   @param {string} series[].color - 柱体渐变主色
 *   @param {number} [series[].width=18] - 柱体宽度 (px)
 * @param {ChartDataPoint[]} data - 数据点
 *   @param {string} data[].label - X 轴标签
 *   @param {Record<string, number>} data[].values - 各系列的值 (key → value)
 * @param {number} [height=200] - 图表容器高度
 * @param {boolean} [showLegend=true] - 是否显示图例
 * @param {string} [className] - 额外类名
 *
 * @example
 * <Chart
 *   series={[
 *     { key: 'sales', label: '销售额', color: '#06b6d4' },
 *     { key: 'users', label: '新增用户', color: '#8b5cf6', width: 10 },
 *   ]}
 *   data={[
 *     { label: '1月', values: { sales: 4200, users: 380 } },
 *   ]}
 * />
 */
export default function Chart({
  series,
  data,
  height = 200,
  showLegend = true,
  className = '',
}) {
  // 计算全局最大值用于归一化
  const maxValue = Math.max(
    ...data.flatMap((d) => Object.values(d.values)),
    1
  )

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.chart} style={{ height }}>
        {data.map((point) => (
          <div className={styles.group} key={point.label}>
            {series.map((s) => {
              const val = point.values[s.key] || 0
              const barHeight = (val / maxValue) * (height * 0.8)

              return (
                <div
                  key={s.key}
                  className={styles.bar}
                  style={{
                    height: `${barHeight}px`,
                    width: `${s.width || 18}px`,
                    background: `linear-gradient(180deg, ${lighten(s.color, 0.3)} 0%, ${s.color} 50%, ${darken(s.color, 0.2)} 100%)`,
                    '--bar-color': s.color,
                  }}
                />
              )
            })}
            <span className={styles.label}>{point.label}</span>
          </div>
        ))}
      </div>

      {showLegend && (
        <div className={styles.legend}>
          {series.map((s) => (
            <div className={styles.legendItem} key={s.key}>
              <span
                className={styles.legendDot}
                style={{ background: s.color }}
              />
              {s.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/** 简单的颜色变亮 (hex -> hex) */
function lighten(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, ((num >> 16) & 0xff) + 60)
  const g = Math.min(255, ((num >> 8) & 0xff) + 60)
  const b = Math.min(255, (num & 0xff) + 60)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

/** 简单的颜色变暗 (hex -> hex) */
function darken(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, ((num >> 16) & 0xff) - 40)
  const g = Math.max(0, ((num >> 8) & 0xff) - 40)
  const b = Math.max(0, (num & 0xff) - 40)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

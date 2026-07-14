import React from 'react'
import styles from './Table.module.css'

/**
 * 通用表格 — Compound Components + 声明式 columns 双模式
 *
 * 模式 1 (声明式, 推荐):
 *   <Table columns={[...]} dataSource={data} rowKey="id" />
 *
 * 模式 2 (自由组合):
 *   <Table>
 *     <Table.Head><Table.Row><Table.Cell header>列名</Table.Cell></Table.Row></Table.Head>
 *     <Table.Body>...</Table.Body>
 *   </Table>
 *
 * @param {Column[]} [columns] - 列配置 (声明式)
 *   @param {string} columns[].key - 数据字段名
 *   @param {string} columns[].title - 列标题
 *   @param {(value, record, index) => React.ReactNode} [columns[].render] - 自定义渲染函数
 *   @param {string|number} [columns[].width] - 列宽
 *   @param {string} [columns[].align] - 列对齐 ('left'|'center'|'right')
 * @param {object[]} [dataSource] - 数据源
 * @param {string} [rowKey='id'] - 行唯一键字段名
 * @param {boolean} [striped=false] - 斑马纹
 * @param {boolean} [hoverable=true] - hover 行高亮
 * @param {string} [className] - 额外类名
 * @param {React.ReactNode} [children] - 自由组合模式
 *
 * @example
 * // 声明式
 * <Table
 *   columns={[
 *     { key: 'id', title: '订单号', width: 120 },
 *     { key: 'customer', title: '客户' },
 *     { key: 'status', title: '状态', render: (v) => <Badge>{v}</Badge> },
 *   ]}
 *   dataSource={orders}
 * />
 *
 * // 自由组合
 * <Table>
 *   <Table.Head>
 *     <Table.Row><Table.Cell header>订单号</Table.Cell></Table.Row>
 *   </Table.Head>
 *   <Table.Body>
 *     {data.map(d => (
 *       <Table.Row key={d.id}><Table.Cell>{d.id}</Table.Cell></Table.Row>
 *     ))}
 *   </Table.Body>
 * </Table>
 */
function Table({
  columns,
  dataSource,
  rowKey = 'id',
  striped = false,
  hoverable = true,
  className = '',
  children,
}) {
  // 声明式模式
  if (columns && dataSource) {
    return (
      <table className={`${styles.table} ${striped ? styles.striped : ''} ${hoverable ? styles.hoverable : ''} ${className}`}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width, textAlign: col.align || 'left' }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((record, idx) => (
            <tr key={record[rowKey] || idx}>
              {columns.map((col) => (
                <td key={col.key} style={{ textAlign: col.align || 'left' }}>
                  {col.render
                    ? col.render(record[col.key], record, idx)
                    : record[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  // 自由组合模式
  return (
    <table className={`${styles.table} ${striped ? styles.striped : ''} ${hoverable ? styles.hoverable : ''} ${className}`}>
      {children}
    </table>
  )
}

/** 表头容器 */
function Head({ children }) {
  return <thead>{children}</thead>
}

/** 表体容器 */
function Body({ children }) {
  return <tbody>{children}</tbody>
}

/** 行 */
function Row({ children, className = '', ...props }) {
  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  )
}

/**
 * 单元格
 * @param {boolean} [header=false] - 是否为表头单元格 (th)
 */
function Cell({ header = false, children, className = '', style, ...props }) {
  const Tag = header ? 'th' : 'td'
  return (
    <Tag className={className} style={style} {...props}>
      {children}
    </Tag>
  )
}

Table.Head = Head
Table.Body = Body
Table.Row = Row
Table.Cell = Cell

export default Table

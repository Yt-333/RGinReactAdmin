/**
 * API 服务层 — 统一请求接口
 * 
 * 模式：开发阶段 useMock=true 使用 mock 数据
 *       生产阶段 useMock=false 走真实 HTTP 请求
 * 
 * 切换方式：修改 config/app.config.js 中的 api.useMock
 *           或设置环境变量 VITE_USE_MOCK=false
 */

import appConfig from '../config/app.config'

const useMock =
  import.meta.env.VITE_USE_MOCK !== undefined
    ? import.meta.env.VITE_USE_MOCK === 'true'
    : appConfig.api.useMock

const BASE_URL = appConfig.api.baseURL
const TIMEOUT = appConfig.api.timeout

/**
 * 通用请求函数
 * 当 useMock 时，返回 mock 数据（需在各 service 中提供 fallback）
 * 当 !useMock 时，发起真实 HTTP 请求
 */
export async function request(endpoint, options = {}) {
  if (useMock) {
    // Mock 模式：返回 null，由调用方提供 mock 数据
    console.log(`[Mock] ${options.method || 'GET'} ${endpoint}`)
    return null
  }

  const url = `${BASE_URL}${endpoint}`
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    }

    return await res.json()
  } finally {
    clearTimeout(timeoutId)
  }
}

// 便捷方法
export const get = (url, opts) => request(url, { ...opts, method: 'GET' })
export const post = (url, data, opts) =>
  request(url, { ...opts, method: 'POST', body: JSON.stringify(data) })
export const put = (url, data, opts) =>
  request(url, { ...opts, method: 'PUT', body: JSON.stringify(data) })
export const del = (url, opts) => request(url, { ...opts, method: 'DELETE' })

export { useMock, BASE_URL }

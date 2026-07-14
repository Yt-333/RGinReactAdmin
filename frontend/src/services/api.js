/**
 * API 服务层 — 统一请求接口
 * 
 * Mock/真实API 切换：设环境变量 VITE_USE_MOCK=false 即可
 */

import { apiConfig } from '../config/app.config'

const useMock = import.meta.env.VITE_USE_MOCK !== undefined
  ? import.meta.env.VITE_USE_MOCK !== 'false'
  : apiConfig.useMock

const BASE_URL = apiConfig.baseURL
const TIMEOUT = apiConfig.timeout

export async function request(endpoint, options = {}) {
  if (useMock) {
    console.log(`[Mock] ${options.method || 'GET'} ${endpoint}`)
    return null
  }
  const url = `${BASE_URL}${endpoint}`
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), TIMEOUT)
  try {
    const res = await fetch(url, { ...options, signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', ...options.headers } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } finally { clearTimeout(t) }
}

export const get    = (url, opts) => request(url, { ...opts, method: 'GET' })
export const post   = (url, data, opts) => request(url, { ...opts, method: 'POST', body: JSON.stringify(data) })
export const put    = (url, data, opts) => request(url, { ...opts, method: 'PUT', body: JSON.stringify(data) })
export const del    = (url, opts) => request(url, { ...opts, method: 'DELETE' })
export { useMock, BASE_URL }

/**
 * ============================================================
 *  API 适配层 — Mock / 真实 API 切换
 *  ============================================================
 *  设计目标：页面代码零改动即可切换数据源。
 *
 *  🚀 快速切换：
 *    开发 Mock：  .env 中 VITE_USE_MOCK=true  （或不设置，默认）
 *    对接后端：   .env 中 VITE_USE_MOCK=false
 *               VITE_API_BASE=http://your-server:8080/api
 *
 *  页面用法：
 *    import { api } from '../config/api.js'
 *    const data = await api.get('/dashboard/stats')
 *    const result = await api.post('/users', { name: '...' })
 *
 *  Mock 数据目录：src/mock/
 *  真实 API 通过 fetch 发送请求。
 *  ============================================================
 */
import { apiConfig } from './app.config.js'

// ── 真实 API 请求器 ──
async function realRequest(method, url, body = null) {
  const headers = {
    'Content-Type': 'application/json',
  }

  // 自动附加 token
  if (apiConfig.authHeader) {
    const token = localStorage.getItem(apiConfig.tokenKey)
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const options = {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  }

  const controller = new AbortController()
  options.signal = controller.signal
  const timer = setTimeout(() => controller.abort(), apiConfig.timeout)

  try {
    const fullUrl = url.startsWith('http') ? url : `${apiConfig.baseURL}${url}`
    const res = await fetch(fullUrl, options)
    if (!res.ok) {
      const error = new Error(`API Error ${res.status}: ${res.statusText}`)
      error.status = res.status
      throw error
    }
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

// ── Mock 请求器 ──
// 页面中直接 import mock data 使用更方便
// 这里提供一个基于路径的简单 mock 路由器

const mockRoutes = {}

/**
 * 注册一个 Mock 路由
 * 用法：registerMock('GET /dashboard/stats', () => ({ ... }))
 */
export function registerMock(path, handler) {
  mockRoutes[path] = handler
}

async function mockRequest(method, url) {
  const key = `${method} ${url}`
  // 也尝试匹配不带 method 的 key
  const handler = mockRoutes[key] || mockRoutes[url]
  if (handler) {
    // 模拟网络延迟
    await new Promise(r => setTimeout(r, 200 + Math.random() * 300))
    return typeof handler === 'function' ? await handler() : handler
  }
  console.warn(`[Mock] 未注册的接口: ${key}，返回空数据`)
  return null
}

// ── 统一 API 对象 ──
export const api = {
  get(url) {
    return apiConfig.useMock
      ? mockRequest('GET', url)
      : realRequest('GET', url)
  },
  post(url, body) {
    return apiConfig.useMock
      ? mockRequest('POST', url)
      : realRequest('POST', url, body)
  },
  put(url, body) {
    return apiConfig.useMock
      ? mockRequest('PUT', url)
      : realRequest('PUT', url, body)
  },
  delete(url) {
    return apiConfig.useMock
      ? mockRequest('DELETE', url)
      : realRequest('DELETE', url)
  },
}

/**
 * 创建 HTTP 客户端实例（自定义 baseURL）
 */
export function createApiClient(customBaseURL) {
  const base = customBaseURL || apiConfig.baseURL
  return {
    get:  (url)   => realRequest('GET', base + url),
    post: (url, b) => realRequest('POST', base + url, b),
    put:  (url, b) => realRequest('PUT', base + url, b),
    delete: (url)  => realRequest('DELETE', base + url),
  }
}

/**
 * 设置鉴权 token
 */
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(apiConfig.tokenKey, token)
  } else {
    localStorage.removeItem(apiConfig.tokenKey)
  }
}

/**
 * 获取当前 token
 */
export function getAuthToken() {
  return localStorage.getItem(apiConfig.tokenKey)
}

export default api

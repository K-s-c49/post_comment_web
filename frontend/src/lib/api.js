const DEFAULT_BASE_URL = '';

const TOKEN_STORAGE_KEY = 'pcm_token';

export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
}

export function setToken(token) {
  if (!token) {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    return;
  }
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

function getBaseUrl() {
  const fromEnv = import.meta.env.VITE_API_BASE_URL;
  if (fromEnv && typeof fromEnv === 'string') return fromEnv.replace(/\/$/, '');
  return DEFAULT_BASE_URL;
}

async function request(path, options) {
  const baseUrl = getBaseUrl();
  const url = baseUrl ? `${baseUrl}${path}` : path;

  const token = getToken();
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
      ...(options?.headers || {}),
    },
    ...options,
  });

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const body = isJson ? await res.json().catch(() => null) : await res.text().catch(() => '');

  if (!res.ok) {
    const message = typeof body === 'object' && body && 'error' in body ? body.error : `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return body;
}

export const api = {
  async register({ username, password }) {
    const data = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (data?.token) setToken(data.token);
    return data;
  },
  async login({ username, password }) {
    const data = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (data?.token) setToken(data.token);
    return data;
  },
  logout() {
    setToken('');
  },
  listPosts() {
    return request('/api/posts');
  },
  createPost({ imageUrl, caption }) {
    return request('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ imageUrl, caption }),
    });
  },
  deletePost(postId) {
    return request(`/api/posts/${postId}`, { method: 'DELETE' });
  },
  listComments(postId) {
    return request(`/api/posts/${postId}/comments`);
  },
  createComment(postId, { text }) {
    return request(`/api/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },
  deleteComment(postId, commentId) {
    return request(`/api/posts/${postId}/comments/${commentId}`, { method: 'DELETE' });
  },
};

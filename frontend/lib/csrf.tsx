import api from './api';

export async function getCsrfToken() {
  const res = await api.get('/auth/csrf-token');
  return res.data.csrfToken;
}

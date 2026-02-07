import api from '../lib/api';
import { getCsrfToken } from '../lib/csrf';

export default function LogoutButton() {
  async function logout() {
    const csrfToken = await getCsrfToken();

    await api.post(
      '/auth/logout',
      {},
      {
        headers: {
          'X-CSRF-Token': csrfToken,
        },
      }
    );

    window.location.href = '/admin/login';
  }

  return <button onClick={logout}>Logout</button>;
}

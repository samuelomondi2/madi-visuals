import { useState } from 'react';
import api from '../../lib/api';
import { getCsrfToken } from '../../lib/csrf';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrfToken = await getCsrfToken();

      await api.post(
        '/auth/login',
        { email, password },
        { headers: { 'X-CSRF-Token': csrfToken } }
      );

      router.push('/admin/dashboard'); // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Admin Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Login</button>
      </form>
    </div>
  );
}

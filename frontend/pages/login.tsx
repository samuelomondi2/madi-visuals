import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../lib/api';
import { getCsrfToken } from '../lib/csrf';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const csrfToken = await getCsrfToken();

      await api.post(
        '/auth/login',
        { email, password },
        {
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        }
      );

      router.push('/dashboard');
    } catch (err) {
      setError("Invalid credentials");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}

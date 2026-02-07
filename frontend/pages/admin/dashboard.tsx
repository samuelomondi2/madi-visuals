import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/router';
import LogoutButton from '@/components/LogoutButton';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/users/me')
      .then(res => setUser(res.data))
      .catch(() => router.push('/admin/login')); // redirect if not logged in
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Admin Dashboard</h1>
      <p>User ID: {user.userId}</p>
      <LogoutButton />
    </div>
  );
}

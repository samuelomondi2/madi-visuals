import LogoutButton from '../components/LogoutButton';

export default function Dashboard({ userId }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>User ID: {userId}</p>
      <LogoutButton />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const axios = require('axios');

    const res = await axios.get(
      'http://localhost:4000/api/users/me',
      {
        headers: {
          cookie: req.headers.cookie || '',
        },
        withCredentials: true,
      }
    );

    return {
      props: {
        userId: res.data.userId,
      },
    };
  } catch {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

import LogoutButton from '../components/LogoutButton';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import axios from 'axios';

type PageProps = {
  userId: string;
};

export default function Dashboard({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>User ID: {userId}</p>
      <LogoutButton />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async({ req }) => {
  try {
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

"use client"
//@ts-expect-error
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) router.push('/');
  }, [router, session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return session ? <>{children}</> : null;
}
import { UpdatePasswordForm } from '@/components/admin/UpdateUserPassword';
import { SpinsLoader } from '@/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trocar senha',
};

export default async function AdminUserPage() {
  return (
    <Suspense fallback={<SpinsLoader className='mb-16' />}>
      <UpdatePasswordForm />
    </Suspense>
  );
}

import { PostFeatured } from '@/components/PostFeatured';

import { PostsList } from '@/components/PostList';
import { SpinsLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export const dynamic = 'force-static';

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinsLoader className='min-h-20 mb-16' />}>
        <PostFeatured />
        <PostsList />
      </Suspense>
    </>
  );
}

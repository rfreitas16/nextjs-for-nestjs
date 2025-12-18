import { findPulicPostBySlugCached } from '@/lib/post/queries/public';
import Image from 'next/image';
import { PostDate } from '../PostDate';
import { SafeMarkdown } from '../SafeMarkdown';
import { PostHeading } from '../PostHeading';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPulicPostBySlugCached(slug);
  return (
    <article className='mb-16'>
      <header className='flex flex-col gap-4 mb-4'>
        <Image
          className='rounded-xl'
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
        />
        <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>
        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>
      <p className='mb-4 text-xl text-slate-600'>{post.excerpt}</p>
      <SafeMarkdown markdown={post.content} />
    </article>
  );
}

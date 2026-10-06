import Image from 'next/image'
import { getData, getPost, img, fmtDate } from '@/lib/cms'
import SiteNav from '@/components/SiteNav'
import ShareButton from '@/components/ShareButton'
import { Calendar } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'
export const revalidate = 60
export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { profile: p } = await getData()
  const post = await getPost(slug)
  if (!post) notFound()
  return <main className="col">
    <SiteNav name={p?.name?.split(' ')[0] ?? 'Home'} />
    {post.cover && <div className="rule px-2 pb-2 pt-2"><div className="relative aspect-[16/8] overflow-hidden rounded-2xl"><Image unoptimized src={img(post.cover)} alt={post.title} fill className="object-cover" /></div></div>}
    <div className="pad">
      <h1 className="font-serif text-4xl leading-tight">{post.title}</h1>
      {post.excerpt && <p className="mt-2 text-lg text-[var(--mute)]">{post.excerpt}</p>}
      <div className="mt-5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm text-[var(--mute)]"><Calendar className="h-4 w-4" />{fmtDate(post.date)}</span>
        <ShareButton title={post.title} />
      </div>
    </div>
    <div className="rule" />
    <div className="pad space-y-4 text-[15px] leading-relaxed text-[var(--fg)]">
      <ReactMarkdown components={{
        h2: (props: any) => <h2 className="pt-4 font-serif text-2xl" {...props} />,
        h3: (props: any) => <h3 className="pt-2 font-serif text-xl" {...props} />,
        strong: (props: any) => <strong className="font-semibold" {...props} />,
        a: (props: any) => <a className="underline underline-offset-4" target="_blank" {...props} />,
        ul: (props: any) => <ul className="list-disc space-y-1 pl-5" {...props} />,
      }}>{post.body}</ReactMarkdown>
    </div>
    <footer className="rule pad text-center text-xs text-[var(--mute)]">© {new Date().getFullYear()} {p?.name}</footer>
  </main>
}
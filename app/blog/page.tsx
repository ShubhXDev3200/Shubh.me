import { getData, img, fmtDate } from '@/lib/cms'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import SiteNav from "@/components/SiteNav"
import Image from 'next/image'
import { AnimatedNavigationTabs } from "@/components/ui/animated-navigation-tabs"
export const revalidate = 60
export default async function BlogPage() {
    const { profile: p, blog } = await getData()
    return <main className="col">
        <SiteNav name={p?.name?.split(" ")[0] ?? "Home"} />
        <div className="pad rule2 pb-4"><h1 className="font-serif text-3xl">Blog</h1></div>
        <div className="pad grid gap-3 sm:grid-cols-2">
            {blog.map((post: any) => {
                const mins = Math.max(1, Math.round((post.excerpt?.split(' ').length ?? 40) / 4))
                return <a key={post._id} href={`/blog/${post.slug}`} className="press group overflow-hidden rounded-lg border border-[var(--line)] hover:bg-[var(--hover)]">
                    {post.cover && <div className="relative aspect-video overflow-hidden"><Image unoptimized src={img(post.cover)} alt={post.title} fill className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                        <span className="absolute bottom-2 left-3 text-xs font-medium text-white/90">{mins} min read</span></div>}
                    <div className="p-4"><h3 className="font-medium group-hover:underline underline-offset-4">{post.title}</h3><p className="mt-1 text-sm text-[var(--mute)]">{post.excerpt}</p>
                        {post.date && <p className="mt-2 text-xs text-[var(--mute)]">{fmtDate(post.date)}</p>}</div></a>
            })}
            {blog.length === 0 && <p className="text-sm text-[var(--mute)]">No posts yet — add one in /admin.</p>}
        </div>
        <footer className="rule pad text-center text-xs text-[var(--mute)]">© {new Date().getFullYear()} {p?.name}</footer>
    </main>
}
import Image from "next/image"
import { getData, img } from "@/lib/cms"
import SiteNav from "@/components/SiteNav"
import { AnimatedNavigationTabs } from "@/components/ui/animated-navigation-tabs"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export const revalidate = 60

export default async function ProjectsPage() {
  const { profile: p, projects } = await getData()

  return (
    <main className="col">
      <SiteNav name={p?.name?.split(" ")[0] ?? "Home"} />

      <div className="pad rule2 pb-4">
        <h1 className="font-serif text-3xl">Craft</h1>
      </div>

      <div className="pad grid gap-4 sm:grid-cols-2">
        {projects.map((x: any) => (
          <article
            key={x._id}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-[var(--line)] p-4"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg">{x.cover && <Image unoptimized src={img(x.cover)} alt={x.title} fill className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0" />}

              {x.badge && (
                <span className="absolute right-2 top-2 rounded bg-lime-300 px-2 py-0.5 text-xs font-medium text-black">
                  {x.badge}
                </span>
              )}
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <h3 className="font-medium">{x.title}</h3>
              <span className="text-xs text-emerald-400">
                {x.status}
              </span>
            </div>

            <p className="text-xs text-[var(--mute)]">
              {x.tagline}
            </p>

            <p className="mt-2 text-sm text-[var(--mute)]">
              {x.description}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
              {x.tech?.map((t: string) => (
                <span
                  key={t}
                  className="rounded bg-[var(--hover)] px-2 py-0.5 text-xs"
                >
                  {t}
                </span>
              ))}

              <span className="ml-auto flex gap-3 text-sm">
                {x.liveUrl && (
                  <a href={x.liveUrl} target="_blank">
                    Live
                  </a>
                )}

                {x.repoUrl && (
                  <a href={x.repoUrl} target="_blank">
                    Code
                  </a>
                )}
              </span>
            </div>
          </article>
        ))}
      </div>

      <footer className="rule pad text-center text-xs text-[var(--mute)]">
        © {new Date().getFullYear()} {p?.name}
      </footer>
    </main>
  )
}
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { AnimatedNavigationTabs } from "@/components/ui/animated-navigation-tabs"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Orb21 } from "@/components/orbs/orb-21"

type SiteNavProps = {
  name?: string
}

export default function SiteNav({ name }: SiteNavProps) {
  const [hash, setHash] = useState("")

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash)

    syncHash()
    window.addEventListener("hashchange", syncHash)

    return () => {
      window.removeEventListener("hashchange", syncHash)
    }
  }, [])

  return (
    <nav className="pad rule flex items-center justify-between text-sm">
      <Link href="/" className="block h-10 w-10 overflow-hidden rounded-full" aria-label={name ?? "Home"}>
        <Orb21 size={40} state="idle" />
      </Link>

      <div className="flex items-center gap-2">
        <AnimatedNavigationTabs
          items={[
            { id: "home", label: "Home", href: "/" },
            { id: "projects", label: "Craft", href: "/projects" },
            { id: "blog", label: "Blog", href: "/blog" },
            { id: "tech", label: "Stack", href: "/#tech" },
          ]}
          hash={hash}
        />

        <AnimatedThemeToggler className="ml-2 hover:bg-[var(--hover)]" />
      </div>
    </nav>
  )
}
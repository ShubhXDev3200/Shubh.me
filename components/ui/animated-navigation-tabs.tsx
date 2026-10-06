"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

type NavItem = {
  id: string
  label: string
  href: string
}

type AnimatedNavigationTabsProps = {
  items: NavItem[]
  hash?: string
}

export function AnimatedNavigationTabs({
  items,
  hash = "",
}: AnimatedNavigationTabsProps) {
  const pathname = usePathname()
  const [hovered, setHovered] = useState<string | null>(null)

  const getActiveId = () => {
    if (pathname.startsWith("/projects")) {
      return "projects"
    }

    if (pathname.startsWith("/blog")) {
      return "blog"
    }

    if (pathname === "/" && hash === "#tech") {
      return "tech"
    }

    if (pathname === "/") {
      return "home"
    }

    return null
  }

  const activeId = getActiveId()

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const isActive = activeId === item.id
          const isHovered = hovered === item.id

          return (
            <li key={item.id}>
              <a
                href={item.href}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "relative block overflow-hidden rounded-md px-3 py-2 text-sm transition-colors duration-200",
                  isActive
                    ? "text-[var(--fg)]"
                    : "text-[var(--mute)] hover:text-[var(--fg)]"
                )}
              >
                {isHovered && (
                  <motion.span
                    layoutId="nav-hover-bg"
                    className="absolute inset-0 rounded-md bg-[var(--hover)]"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      mass: 0.7,
                    }}
                  />
                )}

                {isActive && (
                  <motion.span
                    layoutId="nav-active-line"
                    className="absolute bottom-0 left-2 right-2 h-px bg-[var(--fg)]"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      mass: 0.7,
                    }}
                  />
                )}

                {isHovered && !isActive && (
                  <motion.span
                    layoutId="nav-hover-line"
                    className="absolute bottom-0 left-2 right-2 h-px bg-[var(--fg)]"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      mass: 0.7,
                    }}
                  />
                )}

                <span className="relative z-10">{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
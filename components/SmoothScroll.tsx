"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      stopInertiaOnNavigate: true,
      duration: 1.1,
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      syncTouch: false,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}
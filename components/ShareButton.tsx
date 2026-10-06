"use client"
import { useState } from 'react'

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const onClick = async () => {
    const url = window.location.href
    const nav = navigator as Navigator & { share?: (data: ShareData) => Promise<void> }
    if (nav.share) {
      try { await nav.share({ title, url }) } catch {}
    } else {
      try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch {}
    }
  }
  return <button onClick={onClick} className="press rounded-full bg-[var(--fg)] px-4 py-1.5 text-sm font-medium text-[var(--bg)]">{copied ? 'Copied' : 'Share'}</button>
}
// Reads Decap-managed JSON files from /content at build time.
import fs from 'fs'
import path from 'path'
export const fmtDate = (s?: string) => s ? new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''
const dir = path.join(process.cwd(), 'content')
const read = (f: string) => { try { return JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) } catch { return null } }
const byOrder = (a: any, b: any) => (a.order ?? 999) - (b.order ?? 999)
export const img = (s: any): string => (typeof s === 'string' ? s : '')

const readFolder = (folder: string) => {
  try {
    return fs.readdirSync(path.join(dir, folder)).filter(f => f.endsWith('.json'))
      .map(f => ({ ...read(folder + '/' + f), _id: f, slug: f.replace(/\.json$/, '') })).sort(byOrder)
  } catch { return [] }
}

export async function getData() {
  const profile = read('profile.json')
  const projects = readFolder('projects')
  const blog = readFolder('blog')
  const tech = (read('tech.json')?.items ?? []).map((t: any, i: number) => ({ ...t, _id: 't' + i })).sort(byOrder)
  const highlights = (read('highlights.json')?.items ?? []).map((h: any, i: number) => ({ ...h, _id: 'h' + i }))
  return { profile, projects, blog, tech, highlights }
}

export async function getPost(slug: string) {
  return read('blog/' + slug + '.json')
}
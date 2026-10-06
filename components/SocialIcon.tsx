const brand: Record<string,string> = {github:'github',linkedin:'linkedin',twitter:'x',x:'x'}
const mask = (s:string) => `url(https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${s}.svg) center/contain no-repeat`
const svg = {width:16,height:16,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round' as const,strokeLinejoin:'round' as const}

export default function SocialIcon({name}:{name:string}){
 const k = name.toLowerCase()
 let icon
 if (brand[k]) icon = <span aria-hidden className="h-4 w-4 bg-current" style={{WebkitMask:mask(brand[k]),mask:mask(brand[k])}}/>
 else if (k==='mail'||k==='email') icon = <svg {...svg}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
 else if (k==='resume'||k==='cv') icon = <svg {...svg}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
 else return null
 return <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[var(--line)] bg-white/5">{icon}</span>
}
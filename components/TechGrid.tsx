'use client'
import {useState} from 'react'
import {motion,AnimatePresence} from 'motion/react'
const icon=(s:string)=>`url(https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${s}.svg) center/contain no-repeat`
export default function TechGrid({tech}:{tech:any[]}){
 const cats=['All',...Array.from(new Set(tech.map(t=>t.category).filter(Boolean)))]
 const [c,setC]=useState('All')
 const list=tech.filter(t=>c==='All'||t.category===c)
 return <div className="pad">
  <div className="flex gap-1 mb-4 text-sm">{cats.map(x=><button key={x} onClick={()=>setC(x)} className="press relative rounded-md px-2.5 py-1 text-[var(--mute)] aria-pressed:text-white" aria-pressed={c===x}>
   {c===x&&<motion.span layoutId="tab" className="absolute inset-0 rounded-md bg-white/10" transition={{type:'spring',duration:.35,bounce:0}}/>}<span className="relative">{x}</span></button>)}</div>
  <div className="flex flex-wrap gap-2"><AnimatePresence mode="popLayout">{list.map(t=>
   <motion.a layout key={t._id} href={t.url} target="_blank" initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.9}}
    transition={{type:'spring',duration:.35,bounce:0}} className="press inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-2.5 py-1 text-sm hover:bg-white/5">
    {t.icon&&<span aria-hidden className="h-3.5 w-3.5 shrink-0 bg-current" style={{WebkitMask:icon(t.icon),mask:icon(t.icon)}}/>}{t.name}</motion.a>)}</AnimatePresence></div></div>}
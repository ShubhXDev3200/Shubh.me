'use client'
import {motion,MotionConfig,useReducedMotion} from 'motion/react'
const ease=[0.23,1,0.32,1] as const
// one orchestrated reveal: children stagger in once, on view
export function Stagger({children,className}:{children:React.ReactNode;className?:string}){
 const shouldReduceMotion = useReducedMotion()
 return <MotionConfig reducedMotion="user"><motion.div className={className} initial={shouldReduceMotion ? false : "h"} whileInView={shouldReduceMotion ? undefined : "s"} viewport={{once:true,margin:'-60px'}}
  variants={{h:{},s:{transition:{staggerChildren:.07}}}}>{children}</motion.div></MotionConfig>}
export function Item({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      variants={{
        h: {
          opacity: 0,
          y: 10,
        },
        s: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
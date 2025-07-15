

import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect } from "react"

interface Numberprops{
    number: number;
}
const CountNumber = ({number}:Numberprops) => {
  const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))

    useEffect(() => {
        const controls = animate(count, number, { duration: 10 })
        return () => controls.stop()
    }, [number , count])

    return <motion.pre className="text-4xl text-primary-color font-sans font-bold">{rounded}</motion.pre>
}

export default CountNumber
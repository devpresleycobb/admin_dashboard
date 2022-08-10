import { ReactNode } from 'react'
interface Props {
    children?: ReactNode
}

export default function Layouts({children}: Props) {
  return <div className="flex bg-[#161D31] text-[#CFD2D6] w-full h-screen">
        {children}
        </div>
  
}

import { IButton } from '@/interfaces'

export default function Button(props: IButton) {
    const {
        text,
        className,
        disabled,
        type
    } = props
  return (
    <button 
    type={type}
    className={`bg-blue-400 rounded px-3 py-2 mx-auto block mt-6 ${className}`} 
    disabled={disabled}>{text}</button>
  )
}

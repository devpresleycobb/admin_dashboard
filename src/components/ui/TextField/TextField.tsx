import { ITextField } from '@/interfaces'
export default function TextField(props: ITextField) {
  const {
    placeholder,
    name,
    className,
    type,
    onChange
  } = props

  return <>
    <div className="relative">
      <label>{name}</label>
      <input 
        type={type} 
        className={`${className} pl-3 py-1 border-2 border-gray-400 rounded w-full`} 
        placeholder={placeholder} 
        onChange={onChange}
        />
    </div>
  </>
}

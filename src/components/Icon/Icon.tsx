import { MouseEventHandler } from 'react'

interface IIcon {
    icon?: string,
    onClick?: MouseEventHandler<HTMLSpanElement>,
    className?: string,
}
export default function Icon(props: IIcon) {
    const {
        icon,
        onClick,
        className
    } = props
  return <>
            {icon ? <span className={`material-symbols-rounded ${className}`} onClick={onClick}>{props.icon}</span> : ''}
        </>
}
import { useState, useEffect, useRef } from 'react'
import Icon from '@/components/Icon';
import { IMenuItem } from '@/interfaces';
import { useAppSelector } from '@/app/hooks';
import { selectDrawerToggled } from '@/features/drawer/drawerSlice';

export default function MenuItem({title, children, icon}: IMenuItem) {
    const [maxHeight, setMaxHeight] = useState<number>();
    const [currentHeight, setCurrentHeight] = useState<number>();
    const parent = useRef<HTMLUListElement>(null);
    const toggled = useAppSelector(selectDrawerToggled);
    useEffect(() => {
            new Promise(setMenuDimensions).then((response) => {
                setCurrentHeight(0);
            })
        return () => {
            setCurrentHeight(0);
        }
    }, [toggled])

    const setMenuDimensions = (resolve: (value?: number ) => void) => {
        const height = parent.current?.offsetHeight;
        if(height) {
            setMaxHeight(parent.current?.offsetHeight)
            resolve(maxHeight)
        }
    }
    const styles = {
        maxHeight: currentHeight + 'px'
    }
    const handleToggle = () => {
        if(currentHeight && currentHeight > 0) {
            setCurrentHeight(0);
        }  else {
            setCurrentHeight(maxHeight);
        } 
    }
    const items = children.map((child, index) => 
        <MenuItem
            title={child.title}
            key={index}
            icon="fiber_manual_record"
            children={child.children} />)
    return <>
        <li onClick={handleToggle} className="flex items-center mb-2 cursor-pointer">
            <Icon icon={icon}/>
            {toggled &&<div className="ml-4">{title}</div>}
        </li>
        <ul ref={parent} className="overflow-hidden transition-max-h duration-200 ease-in-out ml-4" style={styles}>
            {items}
        </ul>
    </>
}

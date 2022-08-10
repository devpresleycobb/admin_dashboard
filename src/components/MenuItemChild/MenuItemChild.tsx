import {SubMenu, MenuItem} from 'react-pro-sidebar';
import Icon from '../Icon';

export interface IMenuItemChild {
    id?: number;
    title: string;
    icon?: string;
    children: IMenuItemChild[];
}
export default function MenuItemChild(props: IMenuItemChild) {
    const {
        title,
        children,
        icon
    } = props;
    const items = children.map( item => <MenuItemChild
                                        key={item.id}
                                        title={item.title} 
                                        icon={item.icon} 
                                        children={item.children}/>)
    return <>
        {
            children.length ? 
            <SubMenu title={title} icon={<Icon icon={icon}/>}>{items}</SubMenu> : 
            <MenuItem icon={<Icon icon={icon}/>}>{title}</MenuItem>
        }
            </>
}

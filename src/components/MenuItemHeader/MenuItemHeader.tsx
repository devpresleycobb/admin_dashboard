import MenuItemChild, { IMenuItemChild } from '../MenuItemChild';
import { useAppSelector } from '../../app/hooks';
import { selectDrawerCollapsed } from '../../features/drawer/drawerSlice';
import { Menu} from 'react-pro-sidebar';


export interface IMenuItemHeader {
    id?: number,
    title: string;
    children: IMenuItemChild[]
}
export default function MenuItemHeader(props: IMenuItemHeader) {
    const {
        title,
        children
    } = props;
    const items = children.map( item => <MenuItemChild
                                        title={item.title}
                                        children={item.children}
                                        icon={item.icon}
                                        key={item.id}/>);

    const collapsed = useAppSelector(selectDrawerCollapsed);
    return <>
            {collapsed ? '' :  <div className="pl-5 pt-5">{title}</div>}
            <Menu className="p-0 bg-[#283046]" iconShape="circle">
                {items}
            </Menu>
            </>
}

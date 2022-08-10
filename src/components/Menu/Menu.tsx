import MenuItemHeader, { IMenuItemHeader } from '../MenuItemHeader';
import { ProSidebar, SidebarContent, SidebarHeader } from 'react-pro-sidebar';
import Icon from '../Icon';
import { useAppSelector } from '../../app/hooks';
import { selectDrawerCollapsed, selectDrawerToggled, setDrawerCollapsed, setDrawerToggled } from '../../features/drawer/drawerSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

interface IMenu {
    menuItems: IMenuItemHeader[]
}
export default function Menu(props: IMenu) {
    const [localTmpCollapsed, setLocalTmpCollapsed] = useState<boolean>(false);
    const {
        menuItems
    } = props
    const items = menuItems.map((item: IMenuItemHeader) => <MenuItemHeader
        title={item.title}
        children={item.children}
        key={item.id} />)
    const collapsed = useAppSelector(selectDrawerCollapsed);
    const toggled = useAppSelector(selectDrawerToggled);
    const dispatch = useDispatch();
    const toggleCollapsed = () => {
        dispatch(setDrawerCollapsed(!collapsed))
    }
    const toggleToggled = () => {
        dispatch(setDrawerToggled(!toggled))
    }
    const tmpExpand = () => {
        setLocalTmpCollapsed(false)
    }
    const tmpCollapse = () => {
        setLocalTmpCollapsed(true)
    }
    const styles = {
        menuToggle: {
            justifyContent: collapsed && localTmpCollapsed ? 'center': 'space-between'
        }
    }
    return <>
        <ProSidebar
            onToggle={toggleToggled}
            toggled={toggled}
            collapsed={collapsed && localTmpCollapsed}
            breakPoint="md"
            className="h-screen inline-block">
            <SidebarHeader className="flex px-4 py-4" style={styles.menuToggle}>
                {collapsed && localTmpCollapsed ? '' : <span>Dashboard</span>}
                <Icon icon="menu" className="md:block hidden" onClick={toggleCollapsed} />
            </SidebarHeader>
            <div onMouseEnter={tmpExpand} onMouseLeave={tmpCollapse}>
                <SidebarContent>{items}</SidebarContent>
            </div>
        </ProSidebar>
    </>
}

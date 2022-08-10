import Menu from "../../components/Menu";
import { IMenuItemHeader } from "../../components/MenuItemHeader";

export default function Drawer() {
    const menuItems: IMenuItemHeader[] = [
        {
            id: 1,
            title: 'UI ELEMENTS',
            children: [
                {
                    id: 1,
                    title: 'Main Item',
                    icon: 'star',
                    children: [
                        {
                            id: 1,
                            title: 'Level 2',
                            children: [
                                {
                                    id: 1,
                                    title: 'Level 3',
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 2,
                            title: 'Level 2',
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'APPLICATIONS',
            children: [
                {
                    id: 1,
                    title: 'Email',
                    icon: 'mail',
                    children: []
                }
            ]
        }
    ];
    return (<Menu menuItems={menuItems}/>)
}

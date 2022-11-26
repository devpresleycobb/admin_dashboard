import MenuItem from "@/components/MenuItem"
import { IMenuItemHeader } from '@/interfaces';
import getStyles from './MenuItemHeader.styles';

export default function MenuItemHeader({children, title}: IMenuItemHeader) {
    const items = children.map( (child, index) => <MenuItem
                                                    children={child.children}
                                                    key={index}
                                                    icon={child.icon}
                                                    title={child.title}/>)
    const styles = getStyles()
  return <>
            <div className={`mb-4 ${styles.headerTitle}`}>{title}</div>
            <ul className={styles.mainList}>
                {items}
            </ul>
        </>
}

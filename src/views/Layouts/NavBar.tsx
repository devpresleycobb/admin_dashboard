import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../app/hooks';
import Avatar from '../../components/Avatar';
import Icon from '../../components/Icon'
import { selectDrawerToggled, setDrawerCollapsed, setDrawerToggled } from '../../features/drawer/drawerSlice'

export default function NavBar() {
  const dispatch = useDispatch();
  const toggled = useAppSelector(selectDrawerToggled);
  const toggleDrawer = () => {
    dispatch(setDrawerToggled(!toggled));
    dispatch(setDrawerCollapsed(false));
  }
  return (
    <nav className='bg-component rounded px-4 py-3 flex items-center'>
      <Icon className="md:hidden" onClick={toggleDrawer} icon="menu"/>
      <Avatar/>
    </nav>
  )
}

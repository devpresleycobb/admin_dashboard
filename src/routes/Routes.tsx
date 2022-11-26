import { Route } from 'wouter';
import Home from '@/views/Home'
import Profile from '@/views/Profile'
import { Layouts } from '@/views/Layouts';
import Drawer from '@/components/Drawer';
import Auth from '@/apps/Auth';

export default function Routes({loggedIn}: {loggedIn: boolean}) {
  return loggedIn ? 
          <Layouts>
            <Drawer />
            <Route path="/" component={Home} />
            <Route path="/profile" component={Profile} />
          </Layouts> :
            <Route path="/" component={Auth} />
}

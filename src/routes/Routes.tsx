import { Route } from 'wouter';
import Home from '@/views/Home'
import Drawer from '@/components/Drawer';
import Auth from '@/apps/Auth';

export default function Routes({ loggedIn }: { loggedIn: boolean }) {
  return loggedIn ?
    <div className="flex bg-[#161D31] text-[#CFD2D6] w-full h-screen">
      <Drawer />
      <div className="mx-8 mt-4 w-full">
        <Route path="/" component={Home} />
      </div>
    </div> : <Auth />

}

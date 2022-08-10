import { BrowserRouter, Route, Routes as RRoutes } from 'react-router-dom'
import Auth from '../components/Auth/Auth'
import Home from '../views/Home'
import Profile from '../views/Profile'

export default function Routes() {
  return (
            <BrowserRouter>
                <RRoutes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </RRoutes>
            </BrowserRouter>
  )
}

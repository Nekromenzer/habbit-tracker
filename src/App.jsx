import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/signIn/SignIn'
import HandleAuth from './auth/HandleAuth'
import Layout from './layout/Layout'
// import Dashboard from './pages/dashboard/Dashboard'
import Habits from './pages/user/Habits'
import Tracking from './pages/user/Tracking'
import Profile from './pages/user/Profile'
import Faq from './pages/user/Faq'
import HandleUserLevels from './auth/HandleUserLevels'
import AdminHabit from './pages/admin/AdminHabit'
import NotFound from './pages/NotFound'
import HandleNotFound from './auth/HandleNotfound'

function App () {
  // const isAdmin = localStorage.getItem('isAdmin') || false
  const userType = 'admin'

  return (
    <Routes>
      {/* login sign-in / signup */}
      <Route path='sign-in' element={<SignIn />} />
      {/* protected routes */}
      <Route element={<HandleAuth />}>
        <Route element={<Layout admin={userType === 'admin'} />}>
          <Route
            path='/'
            element={<HandleUserLevels userType={userType === 'user'} />}
          >
            <Route path='/' element={<Habits />} />
            <Route path='tracking' element={<Tracking />} />
            <Route path='profile' element={<Profile />} />
            <Route path='faq' element={<Faq />} />
          </Route>
          {/* only admin has access for this route */}
          <Route
            path='/'
            element={<HandleUserLevels userType={userType === 'admin'} />}
          >
            <Route path='/admin' element={<AdminHabit />} />
          </Route>
        </Route>
      </Route>
      <Route path='404' element={<NotFound />} />
      <Route path='*' element={<HandleNotFound to='/404' />} />
    </Routes>
  )
}

export default App

import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/signIn/SignIn'
import HandleAuth from './auth/HandleAuth'
import Layout from './layout/Layout'
// import Dashboard from './pages/dashboard/Dashboard'
import Habits from './pages/user/Habits'

function App () {
  return (
    <Routes>
      {/* login sign-in / signup */}
      <Route path='sign-in' element={<SignIn />} />
      <Route element={<HandleAuth />}>
        <Route element={<Layout />}>
          <Route path='/' element={<Habits />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App

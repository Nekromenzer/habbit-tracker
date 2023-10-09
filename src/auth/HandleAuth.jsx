import { Outlet, Navigate } from 'react-router'

const HandleAuth = () => {
  const auth = true
  if (!auth) {
    return <Navigate to='/login' replace={true} />
  }
  return <Outlet />
}

export default HandleAuth

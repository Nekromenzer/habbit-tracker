import { Outlet, Navigate } from 'react-router'

const HandleAuth = () => {
  const auth = true
  if (!auth) {
    return <Navigate to='/sign-in' replace={true} />
  }
  return <Outlet />
}

export default HandleAuth

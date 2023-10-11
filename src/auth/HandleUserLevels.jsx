/* eslint-disable react/prop-types */
import { Navigate, Outlet, useLocation } from 'react-router'

const HandleUserLevels = ({ userType }) => {
  const currentRoute = useLocation()
  console.log(currentRoute)
  return userType ? (
    <Outlet />
  ) : (
    <Navigate to={userType === 'admin' ? '/admin' : '/'} replace={true}  />
  )
}
export default HandleUserLevels

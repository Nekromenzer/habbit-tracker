/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router'

const HandleUserLevels = ({ userType }) => {
  return userType ? (
    <Outlet />
  ) : (
    <Navigate to={userType === 'admin' ? '/admin' : '/'} replace={true}  />
  )
}
export default HandleUserLevels

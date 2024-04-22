// import React from 'react'
import { useAppDispatch } from '../../hooks/storeHooks'
import authService from '../../appwrite/authService'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutButn() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const logoutHandler = ()=> {
        authService.appLogout()
        .then(()=> {
          dispatch(logout())
          navigate('/login')
        })
        .catch((err)=> console.log("components :: Header :: LogoutBtn :: Error:: ", err)
        )
    }
  return (
    <button className='bg-blue-600 rounded-md text-white py-1 px-3' onClick={logoutHandler}>
      Logout
    </button>
  )
}

export default LogoutButn

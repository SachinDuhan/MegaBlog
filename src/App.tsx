import { useEffect, useState } from 'react'
import './App.css'
import { useAppDispatch } from './hooks/storeHooks';
import authService from './appwrite/authService';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchActivePosts, fetchAllPosts, fetchUserPosts } from './store/postSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(()=> {
    authService.getCurrentUser()
    .then((userData)=> {
      if (userData) {
        console.log(userData);
        
        dispatch(login(userData))
        dispatch(fetchActivePosts())
        dispatch(fetchAllPosts())
        dispatch(fetchUserPosts({userId:userData.$id}))
      } else {
        dispatch(logout())
        navigate('/login')
      }
    })
    .catch(err => console.log("App :: useEffect :: getCurrentUser :: Error :: ", err)
    )
    .finally(()=> setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App

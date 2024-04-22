import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Protected from './components/AuthLayout.tsx'
import LogIn from './pages/LogIn.tsx'
import Signup from './pages/Signup.tsx'
import AllPosts from './pages/AllPosts.tsx'
import AddPost from './pages/AddPost.tsx'
import EditPost from './pages/EditPost.tsx'
import Post from './pages/Post.tsx'
import UserPosts from './pages/UserPosts.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: '',
        element: <Home/>
      },
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <LogIn/>
          </Protected>
        )
      },
      {
        path: '/signup',
        element: (
          <Protected authentication={false}>
            <Signup/>
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            {" "}
            <AllPosts/>
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            {" "}
            <AddPost/>
          </Protected>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            {" "}
            <EditPost/>
          </Protected>
        )
      },
      {
        path:"/post/:slug",
        element: <Post/>
      },
      {
        path: "/:userId/posts",
        element: (
          <Protected authentication>
            <UserPosts/>
          </Protected>
        ),
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)

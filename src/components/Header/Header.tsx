import { useAppSelector } from '../../hooks/storeHooks'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../container/Container'
import Logo from '../Logo'
import LogoutButn from './LogoutButn'

function Header() {
  const authStatus = useAppSelector((state)=> state.auth.status)
  const userId = useAppSelector((state)=> state.auth.userData?.$id)
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus
    },
    {
      name: "User Posts",
      slug: `/${userId}/posts`,
      active: authStatus
    }
  ]

  return (
    <header className='bg-white static py-3'>
      <Container>
        <nav className='flex gap-10'>
          <div className='align-center relative top-[-0.2rem]'>
            <Link to='/'>
            <Logo/>
            </Link>
          </div>
          <ul className='flex gap-5'>
            {navItems.map((item)=> (
              item.active ? <li key={item.slug}>
                <button onClick={()=> navigate(item.slug)}>{item.name}</button>
              </li> : null
            ))}
            { authStatus &&
              <li className='absolute top-3 right-20'>
                <LogoutButn/>
              </li>
            }
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header

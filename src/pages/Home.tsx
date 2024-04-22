import { useAppSelector } from '../hooks/storeHooks'
import { Container, PostCard } from '../components'
import { useState } from 'react'

function Home() {
  const posts = useAppSelector(state=> state.posts.activePosts)?.documents
  const authStatus = useAppSelector(state=> state.auth.status)
  const [postsStatus, setPostsStatus] = useState('Loading...')

  setTimeout(() => {
    setPostsStatus('No Posts Yet.')
  }, 3000);

  if (!authStatus && !posts) {
    return(
      <div className='w-full py-8 mt-4 text-center'>
        <Container>
          <div className='flex flex-wrap'>
            <div className='p-2 w-full'>
              <h1 className='text-2xl font-bold hover:text-gray-500'>
              Login to view Posts.
              </h1>
            </div>
          </div>
        </Container>
      </div>)
  } else if (authStatus && !posts) {
    return(
      <div className='w-full py-8 mt-4 text-center'>
        <Container>
          <div className='flex flex-wrap'>
            <div className='p-2 w-full'>
              <h1 className='text-2xl font-bold hover:text-gray-500'>
              {postsStatus}
              </h1>
            </div>
          </div>
        </Container>
      </div>)
  } else if (authStatus && posts) {
    return(
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post: {[key:string]:any})=> (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post}/>
            </div>
          ))}
        </div>
      </Container>
    </div>)
  }
}

export default Home

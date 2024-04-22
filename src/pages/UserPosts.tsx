import { useAppSelector } from '../hooks/storeHooks'
import { Container, PostCard } from '../components'

function UserPosts() {
    const posts = useAppSelector((state)=> state.posts.userPosts)?.documents
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
        {posts?.map((post: {[key:string]:any})=> (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default UserPosts

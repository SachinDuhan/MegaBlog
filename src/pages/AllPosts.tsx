import { Container, PostCard } from '../components'
import { useAppSelector } from '../hooks/storeHooks'

function AllPosts() {
    const posts = useAppSelector(state=> state.posts.allPosts)

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts?.documents.map((post: {[key:string]:any})=> (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts

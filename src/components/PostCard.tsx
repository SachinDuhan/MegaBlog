import { Link } from 'react-router-dom'
import storageService from '../appwrite/storageService'

function PostCard({$id, title, featuredimage}:{[key:string]:any}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          {featuredimage && <img src={String(storageService.getFilePreview(featuredimage))} className='rounded-xl' alt={title} />}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dbService from '../appwrite/dbService'
import { Container, PostForm } from '../components'

function EditPost() {
    const [post, setPost] = useState<any|null>(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        if (slug) {
            dbService.getPost(slug)
            .then((post)=> {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost

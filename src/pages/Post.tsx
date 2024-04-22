import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/storeHooks';
import dbService from '../appwrite/dbService';
import storageService from '../appwrite/storageService';
import { Button, Container } from '../components';
import HTMLReactParser from 'html-react-parser/lib/index';

function Post() {
    const [post, setPost] = useState<any|null>(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useAppSelector(state=> state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(()=> {
        if (slug) {
            dbService.getPost(slug)
            .then((post)=> {
                if (post) setPost(post);
                else navigate('/')
            })
        } else navigate('/')
    }, [slug, navigate])

    const deletePost = ()=> {
        dbService.deletePost(post.$id).then((status)=> {
            if (status) {
                storageService.deleteFile(post.featuredimage);
                navigate('/');
            }
        });
    };

  return post ? (
    <div className='py-8'>
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                {post && post.featuredimage && <img src={String(storageService.getFilePreview(post?.featuredimage))} alt={post.title} className='rounded-xl' />
}

                {isAuthor && (
                    <div className='absolute right-6 top-6'>
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
                    </div>
                )}
            </div>
            <div className='w-full mb-6'>
                <h1 className='text-2xl font-bold'>{post.title}</h1>
            </div>
            <div className='browser-css'>
                {HTMLReactParser(post.content)}
            </div>
        </Container>
    </div>
  ) : null
}

export default Post

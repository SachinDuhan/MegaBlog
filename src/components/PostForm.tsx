import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/storeHooks'
import storageService from '../appwrite/storageService'
import dbService from '../appwrite/dbService'
import { useCallback, useEffect } from 'react'
import Input from './Input'
import RTE from './RTE'
import Select from './Select'
import Button from './Button'

function PostForm({post}:{post?:{[key:string]:any}}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            featuredimage: post?.featuredimage || '',
            status: post?.status || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useAppSelector((state)=> state.auth.userData)

    const submit:SubmitHandler<FieldValues> = async(data) => {
        if (post) {
            const file = data.featuredimage[0] ? await storageService.uploadFile(data.featuredimage[0]) : null

            if (file) {
                storageService.deleteFile(post.featuredimage)
            }

            const dbPost = await dbService.updatePost(post.$id,{...data, featuredimage: file? file.$id : post.featuredimage})

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = data.featuredimage[0]? await storageService.uploadFile(data.featuredimage[0]) : null

            if (file) {
                data.featuredimage = file.$id
                const dbPost = await dbService.createPost({
                    title:data.title,
                    slug:data.slug,
                    content: data.content,
                    featuredimage: file.$id,
                    status: data.status,
                    userId:userData?.$id,
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value:string)=> {
        if (value) 
            return value
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters except hyphens and spaces
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-{2,}/g, '-')
        return ''
    }, [])

    useEffect(()=> {
        const subscription = watch((value, {name})=> {
            if (name === 'title'){
                setValue('slug', slugTransform(value.title), {shouldValidate:true})
            }
        })

        return ()=> {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className='flex'>
      <div className='w-2/3 px-2'>
        <Input
        label="Title :"
        placeholder='Title'
        className='mb-4'
        {...register("title", {required:true})}
        />
        <Input
        label="Slug :"
        placeholder='Slug'
        className='mb-4'
        {...register("slug", {required:true})}
        onInput={(e)=> {
            setValue('slug', slugTransform(e.currentTarget.value), {shouldValidate:true})
        }}
        />
        <RTE
        label="Content :"
        name="content"
        control = {control}
        defaultValue={getValues("content")}
        />
      </div>
      <div className='w-1/3 px-2'>
        <Input
        label="Featured Image :"
        type="file"
        className='mb-4'
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("featuredimage", {required:true})}
        />
        {post && (
            <div className='w-full mb-4'>
                {post && post.featuredimage && <img src={String(storageService.getFilePreview(post.featuredimage))} alt={post.title}
                className='rounded-lg'
                 />}
                
            </div>
        )}
        <Select
        options={["active", "inactive"]}
        label="Status"
        className="mb-4"
        {...register("status", {required:true})}
        />
        <Button
        type="submit"
        bgColor={post && "bg-green-500"}
        className="w-full"
        > {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm

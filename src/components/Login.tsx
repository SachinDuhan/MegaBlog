import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/storeHooks'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import authService from '../appwrite/authService'
import {login} from '../store/authSlice'
import Logo from './Logo'
import Input from './Input'
import Button from './Button'

function Login() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const sessionLogin: SubmitHandler<FieldValues> = async(data)=> {
        setError("")
        try {
            const session= await authService.appLogin(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error:any) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width="100%"/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>
            Sign in to your account
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
            Don&apos;t have any account?&nbsp;
            <Link to="/signup"
            className='font-medium text-primary transition-all duration-200 hover:underline'
            >Sign Up</Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(sessionLogin)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder = "Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPattern: (value)=> /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                placeholder = "Enter your password"
                type="password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button type="submit" className="w-full">Sign In</Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login

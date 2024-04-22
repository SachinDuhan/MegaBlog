import { ReactNode } from 'react'

export interface Children<T> {
    children: T
}

function Container({children}:Children<ReactNode>) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      {children}
    </div>
  )
}

export default Container

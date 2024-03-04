import React from 'react'
import Auth from '../Components/Auth'
import Quote from '../Components/Quote'

const SignIn:React.FC = () => {
  return (
    <div>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className='border-2 '>
            <Auth type='signin'/>
          </div>
  
          <div className='hidden lg:block'>
            <Quote/>
          </div>
  
        </div>
    </div>
  )
}

export default SignIn
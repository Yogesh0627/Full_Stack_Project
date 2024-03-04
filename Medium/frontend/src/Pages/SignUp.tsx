import React from 'react'
import Quote from '../Components/Quote'
import Auth from '../Components/Auth'

const SignUp:React.FC = () => {
  return (
    <div>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className='border-2 '>
            <Auth type='signup'/>
          </div>
  
          <div className='hidden lg:block'>
            <Quote/>
          </div>
  
        </div>
    </div>
  )
}

export default SignUp
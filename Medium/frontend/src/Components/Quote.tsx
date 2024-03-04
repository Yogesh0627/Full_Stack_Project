import React from 'react'

const Quote:React.FC = () => {
  return (
    <>
    <div className='bg-slate-200 h-screen flex  flex-col justify-center items-center'>
        <div className=''>
            <div className='max-w-lg text-3xl font-bold'>
                <p>"The customer service I received was exceptional. The support team went above an beyond to address my concern."</p>
            </div>
            <div className='mt-2'>
                <p className='text-lg font-semibold'>Jules Winnfield</p>
                <p className='text-base text-slate-500 font-normal'>CEO, Acme Inc</p>
            </div>
        </div>
    </div>
    </>)
}

export default Quote
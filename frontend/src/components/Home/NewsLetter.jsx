import React from 'react'
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa'

const NewsLetter = () => {
  return (
    <div>
      <div>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
            <FaEnvelopeOpenText/>
            Email me for jobs
            </h3>
            <p className='text0primary/755 text-base mb-4'>          Looking to collaborate on exciting opportunities? Feel free to reach out via email for job inquiries, freelance projects, or networking opportunities. I’m always eager to connect and discuss how I can contribute to your team or project!
            </p>
            <div className='w-full space-y-4'>
                <input type="text" name='email' id='email' placeholder='name@gmail.com' className='w-full block py-2 pl-3 border focus:outline-none'/>
                <input type="submit" value={"SUbscribe"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
            </div>

            
      </div>


      <div className='mt-20'>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
            <FaRocket/>
            Get noticed faster
            </h3>
            <p className='text0primary/755 text-base mb-4'>    Want to be the first to know about exciting job opportunities, career tips, and industry insights? Subscribe to our newsletter and let the opportunities come to you. Your next big break might just be an email away!

            </p>
            <div className='w-full space-y-4'>
                <input type="text" name='email' id='email' placeholder='name@gmail.com' className='w-full block py-2 pl-3 border focus:outline-none'/>
                <input type="submit" value={"Upload your resume"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
            </div>

            
      </div>
    </div>
  )
}

export default NewsLetter

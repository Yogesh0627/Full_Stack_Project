import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../Pages/SignUp'
import SignIn from '../Pages/SignIn'
import Blog from '../Pages/Blog'
import Blogs from '../Pages/Blogs'
import Publish from '../Pages/Publish'
import PrivateRouter from './PrivateRouter'
import MyBlogs from '../Pages/MyBlogs'
import UpdateBlog from '../Pages/UpdateBlog'
import Home from '../Pages/Home'
import About from '../Pages/About'




const AllRoutes:React.FC = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/blogs' element={<PrivateRouter><Blogs/></PrivateRouter>} />
            <Route path='/blogs/myblogs' element={<PrivateRouter><MyBlogs/></PrivateRouter>} />
            <Route path='/blogs/:id' element={<PrivateRouter><Blog/></PrivateRouter>} />
            <Route path='/publish' element={<PrivateRouter><Publish/></PrivateRouter>} />
            <Route path='/blogs/myblogs/update/:id' element={<PrivateRouter><UpdateBlog/></PrivateRouter>} />
            <Route path='/about' element={<About/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes
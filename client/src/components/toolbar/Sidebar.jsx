import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { BiCategoryAlt } from 'react-icons/bi'

const Sidebar = () => {

    const links = [
        {
            name: 'home',
            path: '/',
            icon: <AiFillHome />
        },
        {
            name: 'comments',
            path: '/comments',
            icon: <BiComment />
        },
        {
            name: 'Profile',
            path: '/Profile',
            icon: <CgProfile />
        },
        {
            name: 'categories',
            path: '/categories',
            icon: <BiCategoryAlt />
        },
    ]
    return (
        <>
            <div className='h-screen'>
                <Link to={'/add'}>
                    <div className='bg-blue-300 m-2 p-2 text-xl items-center text-center rounded-md'>+</div>
                </Link>
                {links.map((val, key) => {
                    return (
                        <div key={key} className='capitalize bg-blue-300 m-2 p-2 text-xl items-center text-center rounded-md'>
                            <Link to={val.path} className='flex items-center gap-2'>
                                <div>{val.icon}</div>
                                <div>{val.name}</div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Sidebar

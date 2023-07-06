import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { BiCategoryAlt } from 'react-icons/bi'
import { ImStatsBars2 } from 'react-icons/im'

const Sidebar = () => {

    const links = [
        {
            name: 'home',
            path: '/',
            icon: <AiFillHome />
        },
        {
            name: 'stats',
            path: '/stats',
            icon: <ImStatsBars2 />
        },
        {
            name: 'profile',
            path: '/Profile',
            icon: <CgProfile />
        },
        {
            name: 'posts',
            path: '/',
            icon: <BiCategoryAlt />
        },
        {
            name: 'comments',
            path: '/comments',
            icon: <BiComment />
        },
    ]
    return (
        <>
            <div className='h-screen bg-slate-100'>
                <Link to={'/add'}>
                    <div className='text-purple-500 hover:bg-purple-500 hover:text-white border border-purple-500 my-4 mx-8 p-2 text-base font-bold items-center text-center rounded-2xl'>
                        + NEW POST
                    </div>
                </Link>
                {links.map((val, key) => {
                    return (
                        <div key={key} className='capitalize hover:bg-purple-500 hover:text-white border border-purple-500 m-2 p-2 text-xl items-center text-center rounded-md'>
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

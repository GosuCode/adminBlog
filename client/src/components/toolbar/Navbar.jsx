import { Link } from 'react-router-dom'
// import { AiOutlineSearch } from 'react-icons/ai'
import file from '../Img/file.png'

const Navbar = () => {
    return (
        <div className='w-full h-12 bg-white sticky top-0 flex text-center'>
            <div className='flex-[3] font-mono text-4xl font-bold'>
                <Link to={'/'}>
                    Blogger
                </Link>
            </div>
            {/* <div className='flex-[6]'>
                <div className='border-2 w-[400px] border-b-gray-400 rounded-lg flex mx-36 mt-2'>
                    <AiOutlineSearch className='text-2xl bg-slate-100' />
                    <input type="text"
                        className='outline-none w-[400px] pl-4'
                        placeholder='Search across your blog' />
                </div>
            </div> */}
            <Link to={'/profile'} className='flex-[3] flex justify-center items-center'>
                <div className='h-9 w-9 rounded-full'
                    style={{
                        backgroundImage: `url(${file})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }} />
                <span>Alsreesh</span>
            </Link>
        </div>
    )
}

export default Navbar

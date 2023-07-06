import file from '../Img/file.png'

const User = () => {
    return (
        <div>
            <div className='w-full shadow-sm hover:shadow-lg group overflow-clip shadow-gray-300 border border-gray-300'>
                <div className='w-full flex'>
                    <div className='h-28 w-28'
                        style={{
                            backgroundImage: `url(${file})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }} />
                    <div className='px-3 py-3'>
                        <div className='mb-1'><span>Alsreesh</span></div>
                        <div className='mb-4 flex'>
                            <div>Reader</div>
                            <div className='pl-4 font-bold text-gray-500'>shreeshalember@gmail.com</div>
                        </div>
                        <div className='mb-4 line-clamp-2' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User

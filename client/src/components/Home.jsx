import React from 'react'
import Hero from './Img/Hero.jpg'
import View from './View/View'

const Home = () => {
    return (
        <div className='w-full'>
            <div className='h-[450px]'
                style={{
                    backgroundImage: `url(${Hero})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}>
                <p className='text-center pt-10 font-mono text-6xl'>Welcome Alsreesh</p>
                <p className='text-center pt-10 font-mono text-6xl'>Have a nice day</p>
            </div>
            <div>
                <p className='text-center pt-10 font-semibold text-4xl'>Your Blogs</p>
                <View />
            </div>
        </div>
    )
}

export default Home

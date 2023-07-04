import React from 'react'
import Navbar from '../components/toolbar/Navbar'
import Sidebar from '../components/toolbar/Sidebar'

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className='grid grid-cols-11'>
                <div className='col-span-2'>
                    <Sidebar />
                </div>
                <div className='col-start-3 col-span-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout

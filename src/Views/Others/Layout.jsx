import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from 'Views/Pages/Navbar'
import Footer from 'Views/Pages/Footer'
import ScrollToTopButton from 'Components/Button/ScrollToTopButton'

const Layout = () => {
    return (
        <main className='d-flex flex-column min-vh-100'>
            <nav className=''>
                <Navbar />
            </nav>
            <div className='' style={{ paddingTop: '130px' }}>
                <Outlet />
                <ScrollToTopButton />
            </div>
            <footer className='bg-dark'>
                <Footer />
            </footer>
        </main>
    )
}

export default Layout
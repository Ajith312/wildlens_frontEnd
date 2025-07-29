
import React, { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  };

  if (!visible) return null

  return (
    <div
      onClick={scrollToTop}
      className='brand-color d-flex justify-content-center align-items-center'
      style={{
        position: 'fixed',
        width:'60px',
        height:'60px',
        bottom: '100px',
        right: '30px',
        color: '#fff',
        borderRadius: '50%',
        padding: '10px',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
      }}
    >
      <FaArrowUp size={25} />
    </div>
  )
}

export default ScrollToTopButton;

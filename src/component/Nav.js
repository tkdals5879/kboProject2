import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'


function Nav({ handleMenuClose }) {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0
    })
  }

  return (
      <motion.div className='navWrap'
        initial={{opacity: 0 }}
        animate={{opacity: 1 }}
        exit={{opacity: 0 }}
        transition={{duration: .3}}
      >
        <ul>
          <li onClick={handleMenuClose}><Link to={'/kboClub'} onClick={scrollToTop}>구단정보</Link></li>
          <li onClick={handleMenuClose}><Link to={'/schedule'} onClick={scrollToTop}>경기일정</Link></li>
          <li onClick={handleMenuClose}><Link to={'/myteam'} onClick={scrollToTop}>나의구단</Link></li>
          <li onClick={handleMenuClose}><Link to={'/highlight'} onClick={scrollToTop}>하이라이트</Link></li>
        </ul>
      </motion.div>
  )
}

export default Nav;

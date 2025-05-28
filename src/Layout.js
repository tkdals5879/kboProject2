import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Outlet, Link } from 'react-router-dom';
import Nav from './component/Nav';
import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion';

import './css/layout/layout.css'


function Layout() {

  const teams = useSelector((state) => state.teams?.teams)
  const favTeam = teams.find(team => team.isFavorite === true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate();

  const gotoHome = () => {
    navigate('/')
    window.scrollTo({
      top: 0
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0
    })
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev)
  }
  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  return (
    <div className='layoutWrap'>
      <header className='fixedHeader'>
        <h1 onClick={gotoHome} > KBO Project</h1>
        <ul className={`topNavWrap ${favTeam ? `team_${favTeam?.name}` : ''}`}>
          <li><Link to={'/kboClub'} onClick={scrollToTop}>구단정보</Link></li>
          <li><Link to={'/stadium'} onClick={scrollToTop}>구장정보</Link></li>
          <li><Link to={'/myteam'} onClick={scrollToTop}>나의구단</Link></li>
          <li><Link to={'/schedule'} onClick={scrollToTop}>경기일정</Link></li>
          <li><Link to={'/ticketing'} onClick={scrollToTop}>예매하기</Link></li>
        </ul>

        <div className='hamNav'>
          <div className={`ham ${isMenuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <AnimatePresence>
            {isMenuOpen && <Nav handleMenuClose={handleMenuClose} />}
          </AnimatePresence>
        </div>

        <button className='goToHome' onClick={gotoHome}><FontAwesomeIcon icon={faHouse} /></button>

      </header>

      <main className='pageContent'>
        <Outlet />
      </main>

    </div>
  )
}

export default Layout;

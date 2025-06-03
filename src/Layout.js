import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faL } from '@fortawesome/free-solid-svg-icons'
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

  const gotoStadium = (teamId) => {
    navigate(`/stadium/${teamId}`)
    window.scrollTo({
      top: 0
    })
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

  const [showHeader, setShowHeader] = useState(true);
  const [goTop, setGoTop] = useState(false)

  useEffect(() => {
    const standard = 50;
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        if (window.scrollY > standard) {
          setShowHeader(false)
          setGoTop(true)
        } else {
          setShowHeader(true)
          setGoTop(false)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlegoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className='layoutWrap'>
      <header className={`fixedHeader ${showHeader ? 'show' : 'hide'}`}>
        <div className='teamLogo'>
          <ul>
            {teams.map((team, idx) => (
              <li key={idx} onClick={() => gotoStadium(team.id)}>
                <img src={team.logo} alt={team.homeTeam + 'logo'} />
              </li>
            ))}
          </ul>
          <span className='bar'></span>
        </div>

        <div className='gnb'>
          <h1 onClick={gotoHome} >
            <img src="/kboLogo.png" alt="kboLogo" />
          </h1>
          <ul className={`topNavWrap ${favTeam ? `team_${favTeam?.name}` : ''}`}>
            <li><Link to={'/schedule'} onClick={scrollToTop}>경기일정</Link></li>
            <li><Link to={'/myteam'} onClick={scrollToTop}>나의구단</Link></li>
            <li><Link to={'/stadium'} onClick={scrollToTop}>선수랭킹</Link></li>
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
            <button className='goToHome' onClick={gotoHome}><FontAwesomeIcon icon={faHouse} /></button>
          </div>

        </div>


      </header>

      <main className='pageContent'>
        <Outlet />
      </main>

      <div className={`goTop ${goTop ? 'visible' : ''}`} onClick={handlegoTop}>
        <img src="/baseBall.png" alt="baseBallImg" />
      </div>

    </div>
  )
}

export default Layout;

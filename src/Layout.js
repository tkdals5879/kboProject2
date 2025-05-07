import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import Nav from './component/Nav';

import './css/layout/layout.css'


function Layout() {

  const navigate = useNavigate();
  const location = useLocation()
  const isHome = location.pathname === '/';

  const gotoHome = () => {
    navigate('/')
    window.scrollTo({
      top: 0
    })
  }

  const gotoBack = () => {
    navigate(-1)
    window.scrollTo({
      top: 0
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0
    })
  }

  return (
    <div className='layoutWrap'>
      <header className='fixedHeader'>
        {!isHome && <button className='goToBack' onClick={gotoBack}><FontAwesomeIcon icon={faArrowLeft} /></button>}
        <h1 onClick={gotoHome}> KBO Project</h1>
        <ul className='topNavWrap'>
          <li><Link to={'/stadium'} onClick={scrollToTop}>구장정보</Link></li>
          <li><Link to={'/schedule'} onClick={scrollToTop}>경기일정</Link></li>
          <li><Link to={'/ticketing'} onClick={scrollToTop}>예매하기</Link></li>
          <li><Link to={'/myteam'} onClick={scrollToTop}>나의구단</Link></li>
          <li><Link to={'/result'} onClick={scrollToTop}>결과조회</Link></li>
        </ul>
        <button className='goToHome' onClick={gotoHome}><FontAwesomeIcon icon={faHouse} /></button>
      </header>

      <main className='pageContent'>
        <Outlet />
      </main>

      <footer className='fixedNav'>
        <Nav />
      </footer>

    </div>
  )
}

export default Layout;

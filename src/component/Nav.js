import React from 'react'
import { Link } from 'react-router-dom'


function Nav() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0
    })
  }

  return (
    <div className='navWrap'>
      <ul>
        <li><Link to={'/stadium'} onClick={scrollToTop}>구장정보</Link></li>
        <li><Link to={'/schedule'} onClick={scrollToTop}>경기일정</Link></li>
        <li><Link to={'/ticketing'} onClick={scrollToTop}>예매하기</Link></li>
        <li><Link to={'/myteam'} onClick={scrollToTop}>나의구단</Link></li>
        <li><Link to={'/result'} onClick={scrollToTop}>결과조회</Link></li>
      </ul>
    </div>
  )
}

export default Nav;

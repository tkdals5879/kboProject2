import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function Nav() {

  const teams = useSelector((state) => state.teams.teams)
  const favTeam = teams.find(team => team.isFavorite === true)

  const teamColor = {
    KIA: '#EA0029',
    SAMSUNG: '#0065B2',
    LG: '#C30452',
    DOOSAN: '#1A1748',
    KT: '#ED1A23',
    SSG: '#CE0E2D',
    LOTTE: '#041E42',
    HANHWA: '#FC4E00',
    NC: '#C79F79',
    KIWOOM: '#570514',
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0
    })
  }

  return (
    <div className='navWrap' style={{backgroundColor: teamColor[favTeam?.name] || '#000'}}>
      <ul>
        <li><Link to={'/kboClub'} onClick={scrollToTop}>구단정보</Link></li>
        <li><Link to={'/stadium'} onClick={scrollToTop}>구장정보</Link></li>
        <li><Link to={'/myteam'} onClick={scrollToTop}>나의구단</Link></li>
        <li><Link to={'/schedule'} onClick={scrollToTop}>경기일정</Link></li>
        <li><Link to={'/ticketing'} onClick={scrollToTop}>예매하기</Link></li>
      </ul>
    </div>
  )
}

export default Nav;

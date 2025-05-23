import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TeamRankTable from '../component/TeamRankTable';
import axios from 'axios'

import '../css/myTeam/myTeam.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'



function Myteam() {

  const teamRank = useSelector((state) => state.teamRank.teamRank)
  const teams = useSelector((state) => state.teams.teams)

  const favTeam = teams.find(team => team.isFavorite === true)
  // console.log(favTeam)

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

  const darkColorTeam = ['DOOSAN', 'LOTTE', 'KIWOOM']
  const isDarkColorTeam = darkColorTeam.includes(favTeam?.name)

  const favTeamRank = teamRank.find(rank => rank.teamName === favTeam?.name)
  // console.log(favTeamRank)

  const [players, setPlayers] = useState([]);

  const team = favTeam?.name;
  // console.log(team)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/players?team=${team}`)
      .then((res) => {
        setPlayers(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [team])

  const [selectedPosition, setSelectedPosition] = useState('감독 및 코칭스텝')

  const coachingStaffs = players.filter(player => player.position === '감독' || player.position === '코치')
  const pitchers = players.filter(player => player.position === '투수')
  const infielders = players.filter(player => player.position === '내야수')
  const outfielders = players.filter(player => player.position === '외야수')



  return (
    <div className='myTeamWrap'>
      <h2>나의 구단</h2>
      {favTeam ? (
        <>

          <div className='myTeamDisplay'>

            <div className='myTeamInfoA'>
              <figure>
                <img src={favTeam.logo} alt={`${favTeam.logo}Logo`} />
              </figure>
              <h3>{favTeam.homeTeam}</h3>
            </div>
            <div className='myTeamInfoB'>

              <div>
                <p>현재 랭킹 : {favTeamRank.ranking}위</p>
                <p>경기전적 : {favTeamRank.win}승{favTeamRank.draw}무{favTeamRank.lose}패 </p>
                <p>승률 : {favTeamRank.winPercent}</p>
                <p>연속 : {favTeamRank.winStraight}</p>
                <p>홈 경기전적: {favTeamRank.homeMatchResult} <span>(승,무,패)</span></p>
                <p>원정 경기전적 : {favTeamRank.awayMatchResult} <span>(승,무,패)</span></p>
                <p>최근 10G : {favTeamRank.recent10Game}</p>
              </div>

              <div className='rankTable'>
                <TeamRankTable favTeamName={favTeam.name} />
              </div>

            </div>

          </div>

          <div className='playerListWrap'>
            <h2>선수단 정보</h2>


            <div className='btnWrap'>

              <button onClick={() => setSelectedPosition('감독 및 코칭스텝')}
                style={
                  {
                    backgroundColor: selectedPosition === '감독 및 코칭스텝' ? teamColor[favTeam.name] : '#fff',
                    color: selectedPosition === '감독 및 코칭스텝' ? (isDarkColorTeam ? '#fff' : '#000') : '#000'
                  }}>감독 및 코치</button>

              <button onClick={() => setSelectedPosition('투수')}
                style={
                  {
                    backgroundColor: selectedPosition === '투수' ? teamColor[favTeam.name] : '#fff',
                    color: selectedPosition === '투수' ? (isDarkColorTeam ? '#fff' : '#000') : '#000'
                  }}>투수</button>

              <button onClick={() => setSelectedPosition('내야수')}
                style={
                  {
                    backgroundColor: selectedPosition === '내야수' ? teamColor[favTeam.name] : '#fff',
                    color: selectedPosition === '내야수' ? (isDarkColorTeam ? '#fff' : '#000') : '#000'
                  }}>내야수</button>

              <button onClick={() => setSelectedPosition('외야수')}
                style={
                  {
                    backgroundColor: selectedPosition === '외야수' ? teamColor[favTeam.name] : '#fff',
                    color: selectedPosition === '외야수' ? (isDarkColorTeam ? '#fff' : '#000') : '#000'
                  }}>외야수</button>

            </div>


            <div className='playerList'>
              {(selectedPosition === '감독 및 코칭스텝') && coachingStaffs.map((player, idx) => (
                <div key={idx} className='playerBox'>
                  <div className='img'></div>
                  <div className='playerInfo'>
                    <h3>{player.player_name} <span>&#40; {player.birth_date} &#41;</span> </h3>
                    <p>{player.position} | {player.pitch_bat} | {player.physical}</p>
                  </div>
                </div>
              ))}

              {(selectedPosition === '투수') && pitchers.map((player, idx) => (
                <div key={idx} className='playerBox'>
                  <div className='img'></div>
                  <div className='playerInfo'>
                    <h3>{player.player_name} <span>&#40; {player.birth_date} &#41;</span></h3>
                    <p>{player.position} | {player.pitch_bat} | {player.physical}</p>

                  </div>
                </div>
              ))}

              {(selectedPosition === '내야수') && infielders.map((player, idx) => (
                <div key={idx} className='playerBox'>
                  <div className='img'></div>
                  <div className='playerInfo'>
                    <h3>{player.player_name} <span>&#40; {player.birth_date} &#41;</span></h3>
                    <p>{player.position} | {player.pitch_bat} | {player.physical}</p>

                  </div>
                </div>
              ))}

              {(selectedPosition === '외야수') && outfielders.map((player, idx) => (
                <div key={idx} className='playerBox'>
                  <div className='img'></div>
                  <div className='playerInfo'>
                    <h3>{player.player_name} <span>&#40; {player.birth_date} &#41;</span></h3>
                    <p>{player.position} | {player.pitch_bat} | {player.physical}</p>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (<p>즐겨찾기한 구단이 없습니다!</p>)}

    </div>
  )
}

export default Myteam;

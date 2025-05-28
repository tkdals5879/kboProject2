import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TeamRankTable from '../component/TeamRankTable';
import axios from 'axios'

import '../css/myTeam/myTeam.css'

function Myteam() {
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

  const [players, setPlayers] = useState([]);

  const team = favTeam?.name;

  ////////// 선수단 정보 받아오는 api //////////
  useEffect(() => {
    axios.get(` http://localhost:8000/api/players?team=${team}`)
      .then((res) => {
        setPlayers(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [team])
  ////////// 선수단 정보 받아오는 api //////////


  const [selectedPosition, setSelectedPosition] = useState('감독 및 코칭스텝')

  const coachingStaffs = players.filter(player => player.position === '감독' || player.position === '코치')
  const pitchers = players.filter(player => player.position === '투수')
  const infielders = players.filter(player => player.position === '내야수')
  const outfielders = players.filter(player => player.position === '외야수')

  ////////// 팀 랭킹 받아오는 api, myTeamInfoB Data //////////
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    axios.get(' http://localhost:8000/api/ranking')
      .then(response => {
        setRankings(response.data);
      })
      .catch(error => {
        console.error('순위 정보를 불러오는데 실패했습니다:', error);
      });
  }, []);

  const myTeamInfo = rankings.find(ranking => ranking?.팀명 === favTeam?.modalProps)

  ////////// 팀 랭킹 받아오는 api, myTeamInfoB Data //////////


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
                <p>현재 랭킹 : {myTeamInfo?.순위}위</p>
                <p>경기전적 : {myTeamInfo?.승}승{myTeamInfo?.무}무{myTeamInfo?.패}패 </p>
                <p>승률 : {myTeamInfo?.승률}</p>
                <p>연속 : {myTeamInfo?.연속}</p>
                <p>홈 경기전적: {myTeamInfo?.홈} <span>(승,무,패)</span></p>
                <p>원정 경기전적 : {myTeamInfo?.원정} <span>(승,무,패)</span></p>
                <p>최근 10G : {myTeamInfo?.최근10경기}</p>
              </div>

              <div className='rankTable'>
                <h2>2025 KBO 순위표</h2>
                <TeamRankTable favTeam={favTeam}/>
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

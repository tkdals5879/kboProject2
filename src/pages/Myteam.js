import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Pagination } from 'swiper/modules';
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

  const favoriteTeam = teams.filter(team => team.isFavorite)
  const favTeam = favoriteTeam[0]
  // console.log(favTeam)

  const favTeamRank = teamRank.find(rank => rank.teamName === favTeam?.name)
  // console.log(favTeamRank)

  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');

  const team = favTeam?.name;
  // console.log(team)
  const date = new Date().toISOString().slice(0, 10);
  // console.log(date)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/players?team=${team}&date=${date}`)
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError('데이터를 불러오지 못했습니다.');
      });
  }, [])



  return (
    <div className='myTeamWrap'>
      <h2>나의 구단</h2>
      {favTeam ? (

        <div className='myTeamDisplay'>

          <div className='myTeamInfoA'>
            <figure>
              <img src={favTeam.logo} alt={`${favTeam.logo}Logo`} />
            </figure>
            <h2>{favTeam.homeTeam}</h2>
          </div>
          <div className='myTeamInfoB'>

            <div>
              <p>현재 랭킹 : {favTeamRank.ranking}위</p>
              <p>경기전적 : {favTeamRank.win}승{favTeamRank.draw}무{favTeamRank.lose}패 </p>
              <p>승률 : {favTeamRank.winPercent}</p>
              <p>최근 10G : {favTeamRank.recent10Game}</p>
              <p>연속 : {favTeamRank.winStraight}</p>
              <p>홈 경기전적: {favTeamRank.homeMatchResult} <span>(승,무,패)</span></p>
              <p>원정 경기전적 : {favTeamRank.awayMatchResult} <span>(승,무,패)</span></p>
            </div>

            <div className='rankTable'>
              <TeamRankTable favTeamName={favTeam.name} />
            </div>

          </div>

        </div>
      ) : (<p>즐겨찾기한 구단이 없습니다!</p>)}

      <div className='playerListWrap'>
        {players.map((player, idx) => (
          <div key={idx} className='playerBox'>
            <div className='photo'></div>
            <div className='playerInfo'>
              <h2>이름 : {player.player_name}</h2>
              <p>포지션 : {player.position} / {player.pitch_bat}</p>
              <p>생년월일 : {player.birth_date}</p>
              <p>키, 몸무게 : {player.physical}</p>
              <p>등 번호 : {player.player_number}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Myteam;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TeamRankTable from '../component/TeamRankTable';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';


import '../css/main/main.css'

function Main() {
  const [rankings, setRankings] = useState([]);
  // const [results, setResults] = useState([]);
  const teams = useSelector(state => state?.teams?.teams)
  // const teamName = teams.map(team => team?.modalProps)
  // const teamLogo = teams.map(team => team?.logo)

  // useEffect(() => {
  //   axios.get(' http://localhost:8000/api/result')
  //     .then(response => {
  //       setResults(response.data)
  //       console.log(response.data)
  //     })
  //     .catch(error => console.error("API 호출 실패:", error))
  // }, [])

  const [events, setEvents] = useState([]);
  const [todayGames, setTodayGames] = useState([]);

  useEffect(() => {
    axios.get(" https://baseball-project-1.onrender.com/api/games")
      .then(res => {
        console.log("백엔드 응답:", res?.data?.games);

        const rawGames = res?.data?.games || [];

        setEvents(rawGames);

        const todayStr = new Date().toISOString().slice(0, 10);

        const filteredGames = rawGames.filter(game => {
          const gameDate = new Date(game.start).toISOString().slice(0, 10);
          return todayStr === gameDate;
        })
        setTodayGames(filteredGames)
      })
      .catch(err => {
        console.error("일정 데이터를 불러오는데 실패했습니다:", err);
      });
  }, []);

  useEffect(() => { console.log("events", events) }, [events])

  useEffect(() => {
    axios.get(' https://baseball-project-1.onrender.com/api/ranking')
      .then(response => {
        setRankings(response.data);
      })
      .catch(error => {
        console.error('순위 정보를 불러오는데 실패했습니다:', error);
      });
  }, []);

  useEffect(() => { console.log("rankings > ", rankings) }, [rankings])

  return (
    <div className="mainWrap">

      <div className="videoBg">
        <iframe src="https://www.youtube.com/embed/zh5kWSoO-yg?si=3es6ofQssgoUEfgo&amp;controls=0&cc_load_policy=0&autoplay=1&mute=1&loop=1&playlist=zh5kWSoO-yg"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen></iframe>
        <div className='notice'>
          <p>이 웹사이트는 상업적 목적이 없는 포트폴리오용 사이트입니다. <br />
            사용된 모든 자료의 저작권은 원저작자에게 있으며, 요청 시 즉시 삭제 조치하겠습니다.<br />tkdals1457@naver.com</p>
        </div>
      </div>


      <div>

        <div className='todayGamesWrap'>
          <h2>오늘 경기</h2>

          <Swiper
            className='todayGames'
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={{ dragable: true }}
            breakpoints={{
              1024: { slidesPerView: 3 }
            }}
          >

            {todayGames.map((game, idx) => {
              const [teamA, teamB] = game.title.split(' vs ');

              const teamAData = teams.find(team => team.modalProps === teamA);
              const teamBData = teams.find(team => team.modalProps === teamB);

              return (
                <SwiperSlide key={idx}>
                  <div className='gameBox'>
                    <p>{teamBData?.add}</p>
                    <div className='teamLogos'>
                      {teamAData && <img src={teamAData?.logo} alt={`${teamA} 로고`} />}
                      <div>
                        <span style={{ margin: '0 10px' }}>vs</span>
                        <p className='gameTime'>{game?.start.slice(11, 16)}</p>
                      </div>
                      {teamBData && <img src={teamBData?.logo} alt={`${teamB} 로고`} />}
                    </div>
                    <div className='teamName'>
                      <p>away : {teamAData?.modalProps}</p>
                      <p>home : {teamBData?.modalProps}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>


        <div className='mainResultWrap'>
          <h2>KBO 팀 순위</h2>
          <div>
            <TeamRankTable />
          </div>
        </div>

      </div>

    </div>
  );
}

export default Main;

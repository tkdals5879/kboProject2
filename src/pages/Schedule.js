import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'


import '../css/schedule/schedule.css'

// 날짜, 시간, 팀 이름 파싱 함수
const Schedule = () => {

  const ticketUrls = {
    "LG": "https://www.ticketlink.co.kr/sports",
    "삼성": "https://www.ticketlink.co.kr/sports",
    "KIA": "https://www.giantsclub.com/html/index.asp?",
    "두산": "https://ticket.interpark.com/Contents/Sports",
    "KT": "https://www.ticketlink.co.kr/sports",
    "SSG": "https://www.ticketlink.co.kr/sports",
    "롯데": "https://www.ticketlink.co.kr/sports",
    "키움": "https://ticket.interpark.com/Contents/Sports",
    "한화": "https://www.ticketlink.co.kr/sports",
    "NC": "https://www.ncdinos.com/"
  }

  const [events, setEvents] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/games")
      .then(res => {
        console.log("백엔드 응답:", res.data);

        const rawGames = res.data.games || [];

        // FastAPI에서 이미 변환된 데이터를 그대로 사용
        setEvents(rawGames);
      })
      .catch(err => {
        console.error("일정 데이터를 불러오는데 실패했습니다:", err);
      });
  }, []);

  const handleEventClick = (clickInfo) => {
    const title = clickInfo.event._def.title;  // 예: "삼성 vs 한화"
    const [awayTeam, homeTeam] = title.split("vs");  // 배열 구조 분해

    setSelectedGame({
      homeTeam: homeTeam.trim(),
      awayTeam: awayTeam.trim()
    });
    setIsModalOpen(true);
    console.log("clicked!", { homeTeam, awayTeam });
  };

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <div style={{ maxWidth: '1500px', margin: 'auto' }} className='scheduleWrap'>
      <h2>경기 일정</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        eventClick={handleEventClick}
      />
      {isModalOpen &&
        <div className='scheduleModalBg'>
          <div className='scheduleModalWrap'>
            <button onClick={handleModalClose}><FontAwesomeIcon icon={faCircleXmark} /></button>
            <div className='left'>
              <a href={ticketUrls[selectedGame.awayTeam]} target='_blank' rel="noopener noreferrer">Away : {[selectedGame.awayTeam]} <br/>
                <span>티켓예매 바로가기 &#62; </span>
              </a>
            </div>
            <div className='right'>
              <a href={ticketUrls[selectedGame.homeTeam]} target='_blank' rel="noopener noreferrer">Home : {[selectedGame.homeTeam]} <br/>
              <span>티켓예매 바로가기 &#62; </span>
              </a>
            </div>

          </div>
        </div>
      }
    </div>
  );
};

export default Schedule;
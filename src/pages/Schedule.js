import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'


import '../css/schedule/schedule.css'

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
    axios.get(" https://baseball-project-1.onrender.com/api/games")
      .then(res => {
        console.log("백엔드 응답:", res.data.games);

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
    // console.log("clicked!", { homeTeam, awayTeam });
  };

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const renderEventContent = (eventInfo) => {
    const isMobile = window.innerWidth <= 767;

    const timeColor = {
      '2p': '#EA0029',
      '5p': '#00800A',
      '6:30p': '#0065B2'
    }
    const eventTime = eventInfo.timeText.toLowerCase();
    const dotColor = timeColor[eventTime] || '#000'

    return (
      <div className="fc-event-custom">

        <span className="fc-event-dot" style={{ marginRight: '4px', backgroundColor: dotColor }}></span>
        <span style={{ fontSize: isMobile ? '.5rem' : '.7rem' }}>
          {isMobile
            ? eventInfo.event.title
            : `${eventInfo.timeText} - ${eventInfo.event.title}`}
        </span>
      </div>
    );
  };


  return (
    <div style={{ maxWidth: '1600px', margin: 'auto' }} className='scheduleWrap'>
      <div>
        <h3>경기 일정</h3>
        <div className='dotColorInfo'>
          <h4>시간대 별 색상안내</h4>
          <div>
            <p><span className='red'></span> - 2pm</p>
            <p><span className='green'></span> - 5pm</p>
            <p><span className='blue'></span> - 6:30pm</p>
          </div>
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        eventClick={handleEventClick}
        eventContent={renderEventContent}
      />
      {isModalOpen &&
        <div className='scheduleModalBg'>
          <div className='scheduleModalWrap'>
            <button onClick={handleModalClose}><FontAwesomeIcon icon={faCircleXmark} /></button>
            <div className='left'>
              <a href={ticketUrls[selectedGame.awayTeam]} target='_blank' rel="noopener noreferrer">Away : {[selectedGame.awayTeam]} <br />
                <span>티켓예매 바로가기 &#62; </span>
              </a>
            </div>
            <div className='right'>
              <a href={ticketUrls[selectedGame.homeTeam]} target='_blank' rel="noopener noreferrer">Home : {[selectedGame.homeTeam]} <br />
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
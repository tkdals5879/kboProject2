import React from 'react'
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';

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
  console.log(favTeam)

  const favTeamRank = teamRank.find(rank => rank.teamName === favTeam?.name)
  console.log(favTeamRank)

  return (
    <div className='myTeamWrap'>
      <h2>나의 구단</h2>
      {favTeam ? (

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
              <p>최근 10G : {favTeamRank.recent10Game}</p>
              <p>연속 : {favTeamRank.winStraight}</p>
              <p>홈 경기전적: {favTeamRank.homeMatchResult} <span>(승,무,패)</span></p>
              <p>원정 경기전적 : {favTeamRank.awayMatchResult} <span>(승,무,패)</span></p>
            </div>

          </div>

        </div>
      ) : (<p>즐겨찾기한 구단이 없습니다!</p>)}

      <div className='playerListWrap'>
        <h2>선수 명단</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div className='playerBox'>
              <figure>
                <img src="./taein.webp" alt="taein" />
              </figure>

              <div>
                <p>이름 : 원태인</p>
                <p>생년월일 : 2000년 4월 6일</p>
                <p>포지션 : 선발 투수</p>
                <p>투타 : 우투좌타</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='playerBox'>
              <figure>
                <img src="./taein.webp" alt="taein" />
              </figure>

              <div>
                <p>이름 : 원태인</p>
                <p>생년월일 : 2000년 4월 6일</p>
                <p>포지션 : 선발 투수</p>
                <p>투타 : 우투좌타</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='playerBox'>
              <figure>
                <img src="./taein.webp" alt="taein" />
              </figure>

              <div>
                <p>이름 : 원태인</p>
                <p>생년월일 : 2000년 4월 6일</p>
                <p>포지션 : 선발 투수</p>
                <p>투타 : 우투좌타</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='playerBox'>
              <figure>
                <img src="./taein.webp" alt="taein" />
              </figure>

              <div>
                <p>이름 : 원태인</p>
                <p>생년월일 : 2000년 4월 6일</p>
                <p>포지션 : 선발 투수</p>
                <p>투타 : 우투좌타</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='playerBox'>
              <figure>
                <img src="./taein.webp" alt="taein" />
              </figure>

              <div>
                <p>이름 : 원태인</p>
                <p>생년월일 : 2000년 4월 6일</p>
                <p>포지션 : 선발 투수</p>
                <p>투타 : 우투좌타</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='playerBox'>
              <figure>
                <img src="./taein.webp" alt="taein" />
              </figure>

              <div>
                <p>이름 : 원태인</p>
                <p>생년월일 : 2000년 4월 6일</p>
                <p>포지션 : 선발 투수</p>
                <p>투타 : 우투좌타</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='playerBox'>
              <figure>
                <img src="./taein.webp" alt="taein" />
              </figure>

              <div>
                <p>이름 : 원태인</p>
                <p>생년월일 : 2000년 4월 6일</p>
                <p>포지션 : 선발 투수</p>
                <p>투타 : 우투좌타</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <button>더보기</button>
      </div>

      <div className='matchScheduleWrap'>
        <h2>경기 일정</h2>
        <div className='matchScheduleBox'>
          <div className='matchScheduleBoxMobile'>
            <div className='matchScheduleLeft'>
              <h3>04월</h3>
            </div>
            <div className='matchScheduleRight'>
              {/* 달력디자인해서 해당 요일 누르면 모달창 뜨도록 디자인하기. */}
            </div>
          </div>
          <div className='matchScheduleBoxPc'>
            <div className='matchScheduleLeft'></div>
            <div className='matchScheduleRight'></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Myteam;

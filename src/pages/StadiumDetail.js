import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Modal from '../component/Modal';
import { toggleFavorite } from '../redux/slice/teamsSlice';

import '../css/stadiumDetail/stadiumDetail.css'

function StadiumDetail() {

    const dispatch = useDispatch()
    const { teamId } = useParams();
    const teams = useSelector((state) => state.teams.teams)
    const clickedTeam = teams.find(team => team.id === teamId)

    const info = useSelector((state) => state.teamRank.teamRank)
    const clickedTeamInfo = info.find(infoTeam => infoTeam.teamName.toLowerCase() === teamId.toLowerCase());
    useEffect(() => { console.log("clickedTeamInfo >> ", clickedTeamInfo) }, [clickedTeamInfo])


    const [modalOpen, setModalOpen] = useState(false)

    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    const favToogle = (teamId) => {
        dispatch(toggleFavorite(teamId))
    }

    useEffect(() => {
        console.log("모달 상태 > ", modalOpen);
        if (modalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        }
    }, [modalOpen])

    if (!clickedTeam) return <p>팀을 찾을 수 없습니다!</p>

    return (
        <div className='stadiumDetailWrap'>

            <div className='information'>
                <div className='text'>
                    <h1>{clickedTeam.stadiumName}</h1>
                    <p>{clickedTeam.stadiumOpen}</p>
                </div>

                <div>
                    <div className='stadiumPicture'>
                        <img src={clickedTeam.stadiumImg} alt={clickedTeam.stadiumName} />
                    </div>
                    <div className='homeTeamInfo'>
                        <div className='homeTeamInfoTop'>
                            <h2>홈 구단 정보</h2>
                            <button className='favorite' onClick={() => favToogle(clickedTeam.id)}><FontAwesomeIcon icon={faStar} className={clickedTeam.isFavorite ? 'fav' : ''} /></button>
                        </div>
                        <div>
                            <div className='homeTeamInfoLeft'>
                                <img src={clickedTeam.logo} alt={clickedTeam.homeTeam} />
                            </div>
                            <div className='homeTeamInfoRight'>
                                <h3>{clickedTeam.homeTeam}</h3>
                                <p>순위 : {clickedTeamInfo.ranking}위</p>
                                <p>전적 : {clickedTeamInfo.matchGame}전 {clickedTeamInfo.win}승 {clickedTeamInfo.draw}무 {clickedTeamInfo.lose}패</p>
                                <p>승률 : {clickedTeamInfo.winPercent}</p>
                                <p>최근 10G: {clickedTeamInfo.recent10Game}</p>
                                <p>연속 : {clickedTeamInfo.winStraight}</p>
                                <span onClick={handleModalOpen}>더보기</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='location'>
                <h2>위치</h2>
                <iframe src={clickedTeam.iframeUrl} title={`${clickedTeam.stadiumName} 지도`}></iframe>
            </div>

            {modalOpen && (
                <Modal clickedTeam={clickedTeam} handleModalClose={handleModalClose}  teamId={teamId}/>
            )}

        </div>
    )
}

export default StadiumDetail;

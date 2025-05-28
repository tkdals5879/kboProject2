import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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

    const clickedTeamInfo = rankings.find(ranking => ranking?.팀명 === clickedTeam?.modalProps)
    console.log(clickedTeamInfo)


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
        // console.log("모달 상태 > ", modalOpen);
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
                                <p>순위 : {clickedTeamInfo?.순위}위</p>
                                <p>전적 : {clickedTeamInfo?.경기}전 {clickedTeamInfo?.승}승 {clickedTeamInfo?.무}무 {clickedTeamInfo?.패}패</p>
                                <p>승률 : {clickedTeamInfo?.승률}</p>
                                <p>최근 10G: {clickedTeamInfo?.최근10경기}</p>
                                <p>연속 : {clickedTeamInfo?.연속}</p>
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
                <Modal clickedTeam={clickedTeam} handleModalClose={handleModalClose}/>
            )}

        </div>
    )
}

export default StadiumDetail;

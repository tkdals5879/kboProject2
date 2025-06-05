import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

import '../css/modal/modal.css'

function Modal({ clickedTeam, handleModalClose }) {

    const teamName = clickedTeam.name
    // console.log("teamName", teamName)

    const modalProps = clickedTeam.modalProps
    // console.log("한글 구단 명", modalProps)

    const handleBgClick = (e) => {
        if (e.target.className === 'modalBg') {
            handleModalClose()
        }
    }

    const handleClose = () => {
        handleModalClose()
    }

    const [matches, setMatches] = useState([])

    useEffect(() => {
        if (!modalProps) return;

        axios.get(` https://baseball-project-1.onrender.com/api/recent_matches/?team=${modalProps}`)
            .then(response => {
                setMatches(response.data.recent_matches)
            })
            .catch(error => console.error("순위 정보를 불러오는데 실패했습니다.", error))
    }, [modalProps])

    useEffect(() => { console.log(matches) }, [matches])

    const teamColor = {
        KIA : '#EA0029',
        SAMSUNG : '#0065B2',
        LG : '#C30452',
        DOOSAN : '#1A1748',
        KT : '#ED1A23',
        SSG : '#CE0E2D',
        LOTTE : '#041E42',
        HANHWA : '#FC4E00',
        NC : '#C79F79',
        KIWOOM : '#570514',
    }

    return (
        <div className='modalBg' onClick={handleBgClick}>
            <div className='modalWrap'>
                <div className='head'>
                    <h3>최근 10경기</h3>
                    <button onClick={handleClose}><FontAwesomeIcon icon={faX} /></button>
                </div>
                <div className='tableHead'>
                    <p className='date'>날짜</p>
                    <p className='vs'>vs</p>
                    <p className='result'>결과</p>
                    <p className='runS'>득점</p>
                    <p className='runA'>실점</p>
                </div>
                <div className='matchWrap'>
                    {matches.map((match, idx) => (
                        <div key={idx} className='matchBox'>
                            <p className='date'>{match.DATE}</p>
                            <p className='vs'>{match.VS}</p>
                            <p className='result' style={{color : match.RESULT === 'win' ? `${teamColor[teamName]}` : '#000'}}>{match.RESULT}</p>
                            <p className='runS'>{match.RunsScored}</p>
                            <p className='runA'>{match.RunsAllowed}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Modal;

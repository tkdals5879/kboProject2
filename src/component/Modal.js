import React, { useEffect, useState } from 'react'
import axios from 'axios'

import '../css/modal/modal.css'

function Modal({clickedTeam,handleModalClose,teamId}) {

    // const teams = useSelector((state) => state.teams.teams)
    const teamName = clickedTeam.name
    console.log("ㅁㄴㅇㅁㄴㅇㅁ",teamName)

    console.log("이것은 말이여",teamId)

    const handleBgClick = (e) => {
        if(e.target.className === 'modalBg'){
            handleModalClose()
        }
    }

    const [matches,setMatches] = useState([])

    useEffect(() => {
        if (!teamId) return; // teamId 없으면 요청 안보냄 (예방 코드)

        axios.get(`http://localhost:8000/api/recent_matches/?team=${teamId}`)
        .then(response => setMatches(response.data))
        .catch(error => console.error("순위 정보를 불러오는데 실패했습니다.", error))
    },[teamId])

    return (
        <div className='modalBg' onClick={handleBgClick}>
            <div className='modalWrap'>
                <h3>{teamName}</h3>
            </div>
        </div>
    )
}

export default Modal;

import React from 'react'

import '../css/modal/modal.css'

function Modal({clickedTeam,handleModalClose}) {

    // const teams = useSelector((state) => state.teams.teams)
    const teamName = clickedTeam.name
    console.log(teamName)

    const handleBgClick = (e) => {
        if(e.target.className === 'modalBg'){
            handleModalClose()
        }
    }

    return (
        <div className='modalBg' onClick={handleBgClick}>
            <div className='modalWrap'>
                <h3>{teamName}</h3>
                {/* 최근 10경기 모음 */}
            </div>
        </div>
    )
}

export default Modal;

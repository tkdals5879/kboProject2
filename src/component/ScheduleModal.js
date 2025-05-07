import React from 'react'

function ScheduleModal({ handleModalClose }) {

    const handleBgClick = (e) => {
        if(e.target.className === 'scheduleModalBg') {
            handleModalClose()
        }
    }

    return (
        <div className='scheduleModalBg' onClick={handleBgClick}>
            <div className='scheduleModalWrap'>
                <h2>오늘 경기일정</h2>
                <div></div>
            </div>
        </div>
    )
}

export default ScheduleModal;

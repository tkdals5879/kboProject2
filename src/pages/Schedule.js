import React from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import '../css/schedule/schedule.css'

function Schedule() {

  return (
    <div className='scheduleWrap'>

      <FullCalendar
      initialView = "dayGridMonth"
      plugins={[dayGridPlugin]}
      contentHeight="auto"
      />

    </div>
  )
}

export default Schedule;

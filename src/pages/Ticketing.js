import React from 'react'

import '../css/ticketing/ticketing.css'

function Ticketing() {

  return (
    <div className='ticketingWrap'>
      <h2>예매하기</h2>
      <div className='wrapper'>
        <div className='left'>
          <a href="https://www.ticketlink.co.kr/sports" target='_blank' rel="noopener noreferrer" className='ticketlink'>
            <p className='noneMob'>티켓링크 바로가기 &#62;</p>
            <p className='mob'>예매하기 &#62;</p>
            <div className='linkWrap'>
              <h3> SSG, LG, KT, KIA, 삼성, 한화</h3>
            </div></a>
        </div>

        <div className='right'>
          <div className='rightTop'><a href="https://ticket.interpark.com/Contents/Sports" target='_blank' rel="noopener noreferrer" className='interpark'>
          <p className='noneMob'> 인터파크 바로가기 &#62;</p>
          <p className='mob'>예매하기 &#62;</p>
            <div className='linkWrap'>
              <h3>두산, 키움</h3>
              <div className='interpark'>
              </div>
            </div></a>
          </div>

          <div className='rightBottom'>
            <div className='linkWrap'><a href="https://www.giantsclub.com/html/index.asp?" target='_blank' rel="noopener noreferrer" className='lotte'>
            <p className='noneMob'> 롯데자이언츠 바로가기 &#62;</p>
            <p className='mob'>예매하기 &#62;</p>
              <h3>롯데자이언츠</h3>
              <div className='lotte'>
              </div></a>
            </div>

            <div className='linkWrap'><a href="https://www.ncdinos.com/" target='_blank' rel="noopener noreferrer" className='nc'>
            <p className='noneMob'> NC 다이노스 바로가기 &#62;</p>
            <p className='mob'>예매하기 &#62;</p>
              <h3>NC 다이노스</h3>
              <div className='nc'>
              </div></a>

            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Ticketing;

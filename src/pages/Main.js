import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamRankTable from '../component/TeamRankTable';

import '../css/main/main.css'

function Main() {
  const [rankings, setRankings] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/result')
      .then(response => {
        setResults(response.data)
        console.log(response.data)
      })
      .catch(error => console.error("API 호출 실패:", error))
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/api/ranking')
      .then(response => {
        setRankings(response.data);
      })
      .catch(error => {
        console.error('순위 정보를 불러오는데 실패했습니다:', error);
      });
  }, []);

  // useEffect(() => { console.log("rankings > ", rankings) }, [rankings])

  return (
    <div className="mainWrap">

      <div className='resultBoxWrap'>
        <h2>경기결과</h2>

        <div className='resultBoxes'>
          {results.map((result, idx) => (
            <div className='resultBox' key={idx}>
              <p>{result?.날짜}</p>
              <p>{result?.경기}</p>
              <p>{result?.score?.message}</p>
            </div>
          ))}
        </div>
      </div>


      <div className='mainResultWrap'>
        <h2>KBO 팀 순위</h2>
        <TeamRankTable />
      </div>

      <div className='notice'>
        <p>이 웹사이트는 상업적 목적이 없는 포트폴리오용 사이트입니다. <br />
          사용된 모든 자료의 저작권은 원저작자에게 있으며, 요청 시 즉시 삭제 조치하겠습니다.<br />tkdals1457@naver.com</p>
      </div>

    </div>
  );
}

export default Main;

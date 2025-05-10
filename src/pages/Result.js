import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../css/result/result.css'

function Result() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/ranking')
      .then(response => {
        setRankings(response.data);
      })
      .catch(error => {
        console.error('순위 정보를 불러오는데 실패했습니다:', error);
      });
  }, []);

  useEffect(() => { console.log("rankings > ", rankings) }, [rankings])

  // 열 제목 추출 (첫 번째 항목 기준)
  const columns = rankings.length > 0 ? Object.keys(rankings[0]) : [];

  return (
    <div className="resultWrap">

      <div className='resultBoxWrap'>
        <div className='head'>
          <h2>경기결과</h2>
        </div>

        <div className='resultBoxes'>
          <div className='resultBox'>
            <h3>위치</h3>
          </div>
        </div>
      </div>

      <div className='resultTable'>
        <h2>KBO 팀 순위</h2>
        {rankings.length > 0 ? (
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rankings.map((team, index) => (
                <tr key={index}>
                  {columns.map((col, idx) => (
                    <td key={idx}>{team[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>순위 정보를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
}

export default Result;

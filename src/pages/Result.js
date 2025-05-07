import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Result() {

  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/ranking/')
      .then(reponse => {
        setRankings(Response.data);
      })
      .catch(error => {
        console.error('순위 정보를 불러오는데 실패했습니다:', error)
      });
  }, []);

  return (
    <div className='resultWrap'>
      <h2>KBO 팀 순위</h2>
      <ul>
        {rankings.map((team, index) => (
          <li key={index}>
            {team.rank}위 - {team.name} ({team.wins}승 {team.losses}패)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Result;

import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StadiumCard from '../component/StadiumCard';

import '../css/stadium/stadium.css'

function Stadium() {

  const teams = useSelector((state) => state.teams.teams)
  // console.log(teams)

  const navigate = useNavigate();

  const handleNavigate = (teamId) => {
    navigate(`/stadium/${teamId}`)
    window.scrollTo({
      top: 0
    })
  };

  return (
    <div className='stadiumWrap'>

      <h2>구장 정보</h2>

      <div className='contentsWrap'>
        {teams.map(team => (
          <StadiumCard key={team.id} team={team} handleNavigate={handleNavigate}/>
        ))}

      </div>
    </div>
  )
}

export default Stadium;

import React from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import '../css/stadium/stadium.css'

function Stadium() {

  const teams = useSelector((state) => state.teams.teams)
  console.log(teams)

  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
          <motion.div key={team.id} className={`stadium ${team.name.toLowerCase()} ${team.isFavorite ? 'favorite' : ''}`} onClick={() => handleNavigate(team.id)}
            {...(!isMobile && { whileHover: { scale: 0.98, transition: { duration: 0.2 } } })}
          >
            <div className='infoBox'>
              <div className='stadiumInfo'>
                <h3>{team.stadiumName}</h3>
                <h4>{team.add}</h4>
              </div>
              <p>홈 구단 : {team.homeTeam}</p>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  )
}

export default Stadium;

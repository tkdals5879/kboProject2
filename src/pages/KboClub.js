import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { toggleFavorite } from '../redux/slice/teamsSlice'
import { useNavigate } from 'react-router-dom'

import '../css/kboClub/kboClub.css'



function KboClub() {

  const navigate = useNavigate();

  const dispatch = useDispatch()
  const teams = useSelector((state) => state.teams.teams)

  const favToogle = (teamId) => {
    dispatch(toggleFavorite(teamId))
  }

  const gotoStadium = (teamId) => {
    navigate(`/stadium/${teamId}`)
    window.scrollTo({
      top: 0
    })
  }

  const [showh2, setShowh2] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setShowh2(true)
    } else {
      setShowh2(false)
    }
  }, [])

  return (
    <div className='kboClubWrap'>

      <section>
        {showh2 ? <h2>KBO 구단</h2> : <h3>응원할 구단을 선택해주세요</h3> }

        <div className='clubWrap'>
          {teams.map(team => (
            <div key={team.id} onClick={() => gotoStadium(team.id)}>
              <img src={`.${team.logo}`} alt={team.name + 'logo'} />
              <button className='favorite' onClick={(e) => { e.stopPropagation(); favToogle(team.id); }}><FontAwesomeIcon icon={faStar} className={team.isFavorite ? 'fav' : ''} /></button>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default KboClub;

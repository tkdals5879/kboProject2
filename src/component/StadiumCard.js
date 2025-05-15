import React, { useRef, useState } from 'react'

function StadiumCard({team,handleNavigate}) {

    const cardRef = useRef();
    const [transform, setTransform] = useState({rotateX : 0, rotateY : 0});

    const handleMouseMove = (e) => {
        if (window.innerWidth < 767) return;


        const card = cardRef.current;
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / 10;
        const moveY = (y - centerY) / 10;

        setTransform({rotateX : moveY, rotateY : -moveX });

    }

    const handleMouseLeave = () => {
        if (window.innerWidth < 767) return;
        const card = cardRef.current;
        card.style.transform = `translate(0px,0px)`;
    }

    return (
        <div
        ref={cardRef}
        key={team.id}
        className={`stadium ${team.name.toLowerCase()} ${team.isFavorite ? 'favorite' : ''}`}
        onClick={() => handleNavigate(team.id)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
            transform: `perspective(1200px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
            transition: 'transform 0.1s',
            transformStyle: 'preserve-3d'
        }}
        >
            <div className='infoBox'>
                <div className='stadiumInfo'>
                    <h3>{team.stadiumName}</h3>
                    <h4>{team.add}</h4>
                </div>
                <p>홈 구단 : {team.homeTeam}</p>
            </div>
        </div>
    )
}

export default StadiumCard;

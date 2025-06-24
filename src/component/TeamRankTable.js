import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../css/teamRankTable/teamRankTable.css';

function TeamRankTable({favTeam}) {

    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        axios.get(' https://baseball-project-1.onrender.com/api/ranking')
            .then(response => {
                setRankings(response.data);
            })
            .catch(error => {
                console.error('순위 정보를 불러오는데 실패했습니다:', error);
            });
    }, []);

    const columns = rankings.length > 0 ? Object.keys(rankings[0]) : [];

    return (
        <div className='resultTable'>
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
                            <tr key={index} style={{backgroundColor: team.팀명 === favTeam?.modalProps ? 'gold' : ''}}>
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
    );
}

export default TeamRankTable;

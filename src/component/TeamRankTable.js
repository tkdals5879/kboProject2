import React from 'react';
import { useSelector } from 'react-redux';
import '../css/teamRankTable/teamRankTable.css';

function TeamRankTable({favTeamName}) {
    const teamRank = useSelector((state) => state.teamRank.teamRank);

    const sortedTeams = [...teamRank].sort((a, b) => Number(a.ranking) - Number(b.ranking));

    return (
        <div className="teamRankTableWrap">
            <h2>2025 KBO 순위표</h2>
            <table>
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>팀</th>
                        <th>경기수</th>
                        <th>승</th>
                        <th>무</th>
                        <th>패</th>
                        <th>승률</th>
                        <th>최근 10경기</th>
                        <th>연속</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTeams.map((team) => (
                        <tr key={team.teamName} className={team.teamName === favTeamName ? 'highlightTeam' : ''}>
                            <td>{team.ranking}</td>
                            <td>{team.teamName}</td>
                            <td>{team.matchGame}</td>
                            <td>{team.win}</td>
                            <td>{team.draw}</td>
                            <td>{team.lose}</td>
                            <td>{team.winPercent}</td>
                            <td>{team.recent10Game}</td>
                            <td>{team.winStraight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeamRankTable;

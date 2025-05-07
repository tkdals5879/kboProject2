import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    teams: [
        { id: 'lg', name: 'LG', logo: '/lgLogo.svg', add: '서울,잠실', stadiumName: '서울 종합운동장', homeTeam: 'LG 트윈스', stadiumOpen: '1982년 개장', isFavorite: false, stadiumImg: '/lg-doosan-stadium.jpg', iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3391.471436969427!2d127.06925207596852!3d37.51207152724913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca44564c8dd71%3A0x50a9dc2d455a0848!2z7J6g7Iuk7KKF7ZWp7Jq064-Z7J6lIOyeoOyLpOyVvOq1rOyepQ!5e1!3m2!1sko!2skr!4v1744870783384!5m2!1sko!2skr' },

        { id: 'samsung', name: 'SAMSUNG', logo: '/samsungLogo.svg', add: '대구', stadiumName: '라이온즈파크', homeTeam: '삼성 라이온즈', stadiumOpen: '2016년 개장', isFavorite: false, stadiumImg: '/samsung-stadium.jpg', iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3465.9436664232226!2d128.6789523759032!3d35.84117482117107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3566095381548595%3A0x4a48e31222ad6c61!2z64yA6rWs7IK87ISx65287J207Jio7KaI7YyM7YGs!5e1!3m2!1sko!2skr!4v1744870719507!5m2!1sko!2skr' },

        { id: 'kia', name: 'KIA', logo: '/kiaLogo.svg', add: '광주', stadiumName: '챔피언스 필드', homeTeam: '기아 타이거즈', stadiumOpen: '2014년 개장', isFavorite: false, stadiumImg: '/kia-stadium.jpg', iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3495.112226280453!2d126.88653067587778!3d35.16812855798941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35718c14f294bb77%3A0xbc5fee689590c5ee!2z6rSR7KO86riw7JWE7LGU7ZS87Ja47Iqk7ZWE65Oc!5e1!3m2!1sko!2skr!4v1744870820149!5m2!1sko!2skr' },

        { id: 'doosan', name: 'DOOSAN', logo: '/doosanLogo.svg', add: '서울,잠실', stadiumName: '서울 종합운동장', homeTeam: '두산 베어스', stadiumOpen: '1982년 개장', isFavorite: false, stadiumImg: '/lg-doosan-stadium.jpg', iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3391.471436969427!2d127.06925207596852!3d37.51207152724913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca44564c8dd71%3A0x50a9dc2d455a0848!2z7J6g7Iuk7KKF7ZWp7Jq064-Z7J6lIOyeoOyLpOyVvOq1rOyepQ!5e1!3m2!1sko!2skr!4v1744870783384!5m2!1sko!2skr' },

        { id: 'kt', name: 'KT', logo: '/ktLogo.svg', add: '수원', stadiumName: 'KT 위즈파크', homeTeam: 'KT 위즈', stadiumOpen: '1989년 개장', isFavorite: false, stadiumImg: '/kt-stadium.webp', iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.095523614296!2d127.00709357596003!3d37.29975953938038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b5db07ba6e26f%3A0xf8d00419ae70fbb8!2z7IiY7JuQS1TsnITspojtjIztgaw!5e1!3m2!1sko!2skr!4v1744870847204!5m2!1sko!2skr' },

        { id: 'ssg', name: 'SSG', logo: '/ssgLogo.svg', add: '인천', stadiumName: 'SSG랜더스필드', homeTeam: 'SSG 랜더스', stadiumOpen: '2002년 개장', isFavorite: false, stadiumImg: '/ssg-stadium.jpg', iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3394.877644987107!2d126.68839078626256!3d37.43704645954717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b797247fe0a07%3A0x1cee0c41954877aa!2z7J247LKcIFNTRyDrnpzrjZTsiqTtlYTrk5w!5e1!3m2!1sko!2skr!4v1744870872656!5m2!1sko!2skr' },

        { id: 'lotte', name: 'LOTTE', logo: '/lotteLogo.svg', add: '부산', stadiumName: '사직 야구장', homeTeam: '롯데 자이언츠', stadiumOpen: '1985년 개장', isFavorite: false, stadiumImg: '/lotte-stadium.jpeg', iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.9983476264415!2d129.0589433758786!3d35.194035956583036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356894a4d904ed73%3A0x6ef11ea46cdefe25!2z7IKs7KeB7JW86rWs7J6l!5e1!3m2!1sko!2skr!4v1744870894131!5m2!1sko!2skr' },

        { id: 'kiwoom', name: 'KIWOOM', logo: '/kiwoomLogo.svg', add: '서울,구로', stadiumName: '고척 스카이돔', homeTeam: '키움 히어로즈', stadiumOpen: '2015년 개장', isFavorite: false, stadiumImg: '/kiwoom-stadium.jpg', iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4475.914804153527!2d126.86529999951748!3d37.49803313249447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9d6549604903%3A0xc28629c08ed0fc25!2z6rOg7LKZ7Iqk7Lm07J2064-U!5e1!3m2!1sko!2skr!4v1744870916798!5m2!1sko!2skr' },

        { id: 'hanhwa', name: 'HANHWA', logo: '/hanhwaLogo.svg', add: '대전', stadiumName: '한화생명 볼파크', homeTeam: '한화 이글스', stadiumOpen: '2025년 개장', isFavorite: false, stadiumImg: '/hanhwa-stadium.jpg', iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.0591063208767!2d127.42858227592157!3d36.31642019482058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35654900044ea8bd%3A0xcccc3617c6bca4c1!2z64yA7KCEIO2VnO2ZlOyDneuqhSDrs7ztjIztgaw!5e1!3m2!1sko!2skr!4v1744870941041!5m2!1sko!2skr' },

        { id: 'nc', name: 'NC', logo: '/ncLogo.svg', add: '창원', stadiumName: 'NC파크', homeTeam: 'NC 다이노스', stadiumOpen: '2019년 개장', isFavorite: false, stadiumImg: '/nc-stadium.avif', iframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3492.769374139387!2d128.57965427587973!3d35.2226010550313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356f334f2db0b68f%3A0x64ca49f2d2cb27e7!2z7LC97JuQTkPtjIztgaw!5e1!3m2!1sko!2skr!4v1744870963156!5m2!1sko!2skr' }

    ],
};

const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        toggleFavorite(state, action) {
            const teamId = action.payload

            const alreadyFav = state.teams.some(team => team.isFavorite)
            const clickedteam = state.teams.find(team => team.id === teamId)

            if (alreadyFav && !clickedteam.isFavorite) {
                alert("하나의 팀만 응원할 수 있습니다!");
                return;
            }

            state.teams.forEach(team => {
                if (team.id === teamId) {
                    team.isFavorite = !team.isFavorite;
                }
            });

        },
    }
});

export const { toggleFavorite } = teamsSlice.actions;
export default teamsSlice.reducer;
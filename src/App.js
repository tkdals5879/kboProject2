import React from 'react'
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import KboClub from './pages/KboClub';
import Stadium from './pages/Stadium';
import StadiumDetail from './pages/StadiumDetail';
import Schedule from './pages/Schedule'
import Ticketing from './pages/Ticketing'
import Myteam from './pages/Myteam'
import Main from './pages/Main'

import 'swiper/css';
import 'swiper/css/pagination';

function App() {

  useEffect(() => {
    const imagesToPreload = [
      '/hanhwa-stadium.jpg',
      '/hanhwaLogo.svg',
      '/kia-stadium.jpg',
      '/kiaLogo.svg',
      '/kiwoom-stadium.jpg',
      '/kiwoomLogo.svg',
      '/kt-stadium.webp',
      '/ktLogo.svg',
      '/lg-doosan-stadium.jpg',
      '/lgLogo.svg',
      '/lotte-stadium.jpeg',
      '/lotteLogo.svg',
      '/modalDoosan.svg',
      '/modalKia.svg',
      '/modalLg.svg',
      '/modalNc.webp',
      '/modalSamsung.svg',
      '/modalSsg.svg',
      '/nc-stadium.avif',
      '/ncLogo.svg',
      '/samsung-stadium.jpg',
      '/samsungLogo.svg',
      '/ssg-stadium.jpg',
      '/ssgLogo.svg',
    ];
  
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = process.env.PUBLIC_URL + src;
    });
  }, []);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main/>}/>
          <Route path='/stadium' element={<Stadium/>}/>
          <Route path='/stadium/:teamId' element={<StadiumDetail/>}/>
          <Route path='/schedule' element={<Schedule/>}/>
          <Route path='/ticketing' element={<Ticketing/>}/>
          <Route path='/myteam' element={<Myteam/>}/>
          <Route path='/kboClub' element={<KboClub/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

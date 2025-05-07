import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Main from './pages/Main';
import Stadium from './pages/Stadium';
import StadiumDetail from './pages/StadiumDetail';
import Schedule from './pages/Schedule'
import Ticketing from './pages/Ticketing'
import Myteam from './pages/Myteam'
import Result from './pages/Result'

import 'swiper/css';
import 'swiper/css/pagination';

function App() {
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
          <Route path='/result' element={<Result/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

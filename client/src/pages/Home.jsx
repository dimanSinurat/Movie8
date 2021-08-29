import React from 'react'
import Navbar from '../components/Navbar.jsx';
import Banner from '../components/Banner.jsx';
import Banner2 from '../components/Banner2.jsx';
import Board from '../components/Board.jsx';
import MiddleBoard from '../components/MiddleBoard.jsx'
import Footer from '../components/Footer';
import {useQuery} from '@apollo/client';
import {FETCH_MOVIE} from '../graphQL';



function Home() {
  const {data, loading, error} = useQuery(FETCH_MOVIE)
  
  return (
    <>
      <Navbar/>
      <Banner movie={data} isLoading={loading} isError={error} />
      <Board  movie={data} isLoading={loading} isError={error} />
      <MiddleBoard
        title1="TV"
        title2="Series"
        title3="to Watch Now"
        movie={data} isLoading={loading} isError={error}
      />
      <Banner2/>
      <Footer/>
    </>
  )
}

export default Home
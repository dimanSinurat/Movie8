import React from 'react';
import { useHistory } from 'react-router';
import {useQuery} from '@apollo/client';
import Navbar from '../components/Navbar.jsx';
import MiddleBoard from '../components/MiddleBoard.jsx';
import Content from '../components/Content.jsx';
import {FETCH_MOVIE} from '../graphQL';




export default function Movie() {
  const {data, loading, error} = useQuery(FETCH_MOVIE)
  const history = useHistory()
  const page = history.location.pathname 
  return (
    <>
      <Navbar/>
      <MiddleBoard
       render={page}
       title1="Movie"
       title2="Series"
       title3="Collections"
       name="Movie"
       movie={data} isLoading={loading} isError={error}
       />
       <Content movie={data} isLoading={loading} isError={error}/>
    </>
  )
}

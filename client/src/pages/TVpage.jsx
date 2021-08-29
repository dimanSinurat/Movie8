import React from 'react';
import Navbar from '../components/Navbar.jsx'
import MiddleBoard from '../components/MiddleBoard.jsx'
import { useHistory } from 'react-router';
import Content from '../components/Content.jsx';
import {gql, useQuery} from '@apollo/client'

const FETCH_TV = gql`
  query FetchTv {
    tvSeries {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`

export default function TVpage() {
  const {data, loading, error} = useQuery(FETCH_TV)
  const history = useHistory()
  const page = history.location.pathname.substr(1) 
  return (
    <>
      <Navbar/>
      <MiddleBoard
       render={page}
       title1="TV"
       title2="Series"
       title3="Collections"
       name="TV Series"
       movie={data} isLoading={loading} isError={error}
       />
       <Content
       movie={data} isLoading={loading} isError={error} render={page}
       />
    </>
  )
}

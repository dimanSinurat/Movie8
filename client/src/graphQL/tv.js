import {gql} from '@apollo/client';

/** query block */
export const FETCH_TV = gql`
  query tvSeriesList {
    tvSeries {
      _id
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`

export const FETCH_ONE_TV = gql`
  query Fetchtv_by_id($id: ID) {
    tvSerie(_id: $id) {
      _id
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`

/** mutation block */
export const ADD_TV_MUTATION = gql`
  mutation AddTvMutation(
    $title: String
    $overview: String
    $poster_path: String
    $popularity:Float
    $tags:[String]
    ) {
      addTvSeries(
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`

export const DELETE_TV_MUTATION = gql`
  mutation deleteTvMutation($_id:ID){
    deleteTvSeries(_id: $_id){
      title
    }
  }
`

export const UPDATE_TV_MUTATION = gql`
  mutation UpdateTvMutation(
    $_id: ID
    $title: String
    $overview: String
    $poster_path: String
    $popularity:Float
    $tags:[String]
    ) {
      updateTvSeries(
      _id: $_id
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) {
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`
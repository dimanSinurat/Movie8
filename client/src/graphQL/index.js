import {gql} from '@apollo/client';

/** query block */
export const FETCH_MOVIE = gql`
  query Fetchmovies {
    movies {
      _id
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`
export const FETCH_ALL_DATA = gql`
  query FetchAll {
    allData {
      movies {
        _id
        title,
        overview,
        poster_path,
        popularity,
        tags
     },
      tvSeries {
        _id
        title,
        overview,
        poster_path,
        popularity,
        tags
     }  
    }
  }
`

export const FETCH_ONE = gql`
  query FetchMovie($id: ID) {
    movie(_id: $id) {
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
export const ADD_MOVIE_MUTATION = gql`
  mutation AddMovieMutation(
    $title: String
    $overview: String
    $poster_path: String
    $popularity:Float
    $tags:[String]
    ) {
    addMovie(
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

export const DELETE_MOVIE_MUTATION = gql`
  mutation deleteMutation($_id:ID){
    deleteMovie(_id: $_id){
      title
    }
  }
`

export const UPDATE_MOVIE_MUTATION = gql`
  mutation UpdateMovieMutation(
    $_id: ID
    $title: String
    $overview: String
    $poster_path: String
    $popularity:Float
    $tags:[String]
    ) {
    updateMovie(
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
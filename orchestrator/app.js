const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const typeDefs = gql`

type Movie {
  _id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String]
}

type TVseries {
  _id: ID
  title: String
  overview: String
  poster_path: String
  popularity: Float
  tags: [String]
}

type AllData {
  movies: [Movie]
  tvSeries: [TVseries]
}
 
type Query {
  allData: AllData
  movies: [Movie]
  tvSeries: [TVseries]
  movie(_id: ID): Movie
  tvSerie(_id: ID): TVseries
}

type Mutation {
  addMovie(title: String, overview: String, poster_path:String, popularity:Float, tags:[String]): Movie
  updateMovie(_id: ID, title: String, overview: String, poster_path:String, popularity:Float, tags:[String]): Movie
  deleteMovie(_id: ID): Movie
  addTvSeries(title: String, overview: String, poster_path:String, popularity:Float, tags:[String]): TVseries
  updateTvSeries(_id: ID, title: String, overview: String, poster_path:String, popularity:Float, tags:[String]): TVseries
  deleteTvSeries(_id: ID): TVseries
}
`

const resolvers = {
  Query: {
    movies() {
      let result = null
      return redis.get("movieList")
        .then(value => {
          if (value) {
            return JSON.parse(value)
          } else {
            return axios({
              method: 'get',
              url: 'http://localhost:4001/api/v1/movie/'
            })
              .then(({ data }) => {
                result = data;
                const responseString = JSON.stringify(data)
                return redis.set("movieList", responseString)
              })
              .then((value) => {
                console.log(value, 'redis is saving data to storage ram now')
                return result
              })
              .catch((err) => {
                return err.response.data
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    tvSeries() {
      let result = null

      return redis.get("tvList")
        .then(value => {
          if (value) {
            return JSON.parse(value)
          } else {
            return axios({
              method: 'get',
              url: 'http://localhost:4002/api/v1/tv/'
            })
              .then(({ data }) => {
                result = data;
                const responseString = JSON.stringify(data)
                return redis.set("tvList", responseString)
              })
              .then((value) => {
                console.log(value, 'redis is saving data to storage ram now')
                return result
              })
              .catch((err) => {
                return err.response.data
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    movie(_, args) {
      const { _id } = args

      return redis.get("movieList")
        .then((value) => {
          if (value) {
            let result = JSON.parse(value).filter((el) => el._id === _id)
            return result[0]
          } else {
            return axios({
              method: 'get',
              url: `http://localhost:4001/api/v1/movie/${_id}`
            })
              .then(({ data }) => {
                return data
              })
              .catch((err) => {
                return err.response.data
              })
          }
        })
        .catch(err => {
          return err.response.data.message
        })
    },

    tvSerie(_, args) {
      const { _id } = args
      return redis.get("tvList")
        .then((value) => {
          if (value) {
            let result = JSON.parse(value).filter((el) => el._id === _id)
            return result[0]
          } else {
            return axios({
              method: 'get',
              url: `http://localhost:4002/api/v1/tv/${_id}`
            })
              .then(({ data }) => {
                return data
              })
              .catch((err) => {
                return err.response.data.message
              })
          }
        })
        .catch(err => {
          return err.response.data.message
        })
    },

    allData() {
      const response = {}

      return redis.get("allData")
        .then((value) => {
          if (value) {
            console.log('dari redis')
            return JSON.parse(value)
          } else {
            console.log('fetch')
           return axios({
              method: 'get',
              url: 'http://localhost:4001/api/v1/movie/'
            })
              .then(({ data }) => {
                response.movies = data;
                return axios({
                  method: 'get',
                  url: 'http://localhost:4002/api/v1/tv/'
                })
                  .then(({ data }) => {
                    response.tvSeries = data
                    let responseString = JSON.stringify(response);
                    return redis.set("allData", responseString)
                  })
                  .then((_) => {
                    return response
                  })
                  .catch((err) => {
                    return err
                  })
              })
          }
        })
        .catch((err) => {
          return err
        })
    }
  },

  Mutation: {
    addMovie(_, args) {
      const { title, overview, poster_path, popularity, tags } = args;
      const payload = { title, overview, poster_path, popularity, tags }

      return axios({
        method: 'post',
        url: 'http://localhost:4001/api/v1/movie',
        data: payload
      })
        .then(({ data }) => {
          redis.del("movieList")
          redis.del("allData")
          return data.message
        })
        .catch((err) => {
          const status = err.response.data.message
          const detail = err.response.data.detail
          return `${status} - ${detail}`
        })
    },

    updateMovie(_, args) {
      let { _id, ...payload } = args;

      let result = null
      return axios({
        method: 'put',
        url: `http://localhost:4001/api/v1/movie/${_id}`,
        data: payload
      })
        .then(({ data }) => {
          result = data
          redis.del("allData")
          return redis.del("movieList")
        })
        .then((_) => {
          return result.message
        })
        .catch((err) => {
          const message = err.response.data.message
          const detail = err.response.data.detail
          return `${message} - ${detail}`
        })
    },

    deleteMovie(_, args) {
      const { _id } = args
      let result = null
      return axios({
        method: 'delete',
        url: `http://localhost:4001/api/v1/movie/${_id}`
      })
        .then(({ data }) => {
          result = data
          redis.del("allData")
          return redis.del("movieList")
        })
        .then((_) => {
          return result.message
        })
        .catch((err) => {
          const message = err.response.data.message
          const detail = err.response.data.detail
          return `${message} - ${detail}`
        })
    },

    addTvSeries(_, args) {
      const { title, overview, poster_path, popularity, tags } = args;
      const payload = { title, overview, poster_path, popularity, tags }
      let result = null

      return axios({
        method: 'post',
        url: 'http://localhost:4002/api/v1/tv/',
        data: payload
      })
        .then(({ data }) => {
          result = data
          redis.del("allData")
          return redis.del("tvList")
        })
        .then((_) => {
          return result.message
        })
        .catch((err) => {
          const message = err.response.data.message
          const detail = err.response.data.detail
          return `${message} - ${detail}`
        })
    },

    updateTvSeries(_, args) {
      let { _id: id, ...payload } = args;

      let result = null
      return axios({
        method: 'put',
        url: `http://localhost:4002/api/v1/tv/${id}`,
        data: payload
      })
        .then(({ data }) => {
          result = data
          redis.del("allData")
          return redis.del("tvList")
        })
        .then((_) => {
          return result.message
        })
        .catch((err) => {
          const message = err.response.data.message
          const detail = err.response.data.detail
          return `${message} - ${detail}`
        })
    },

    deleteTvSeries(_, args) {
      const { _id } = args
      let result = null
      return axios({
        method: 'delete',
        url: `http://localhost:4002/api/v1/tv/${_id}`
      })
        .then(({ data }) => {
          result = data
          redis.del("allData")
          return redis.del("tvList")
        })
        .then((_) => {
          return result.message
        })
        .catch((err) => {
          const message = err.response.data.message
          const detail = err.response.data.detail
          return `${message} - ${detail}`
        })
    }

  }
}


const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log('Apolo running on', url)
})
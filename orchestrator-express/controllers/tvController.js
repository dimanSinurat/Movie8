const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis()

class Controller {
  static getAll(req, res) {
    let result = null

    redis.get("tvList")
      .then(value => {
        if (value) {
          res.status(200).json(JSON.parse(value))
        } else {
          axios({
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
              res.status(200).json(result)
            })
            .catch((err) => {
              res.status(500).json(err.response.data)
            })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  static getOne(req, res) {
    const { id } = req.params
    redis.get("tvList")
      .then((value) => {
        if (value) {
          let result = JSON.parse(value).filter((el) => el._id === id)
          res.send(result)
        } else {
          axios({
            method: 'get',
            url: `http://localhost:4002/api/v1/tv/${id}`
          })
            .then(({ data }) => {
              res.status(200).json(data)
            })
            .catch((err) => {
              res.status(500).json(err.response.data)
            })
        }
      })
      .catch(err => {
        res.status(500).json(err.response.data)
      })
  }

  static create(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const payload = { title, overview, poster_path, popularity, tags }
    let result = null
    axios({
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
        res.status(201).json(result)
      })
      .catch((err) => {
        res.status(500).json(err.response.data)
      })
  }

  static update(req, res) {
    const { id } = req.params
    const payload = req.body
    let result = null
    axios({
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
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json(err.response.data)
      })
  }

  static delete(req, res) {
    const { id } = req.params
    let result = null
    axios({
      method: 'delete',
      url: `http://localhost:4002/api/v1/tv/${id}`
    })
      .then(({ data }) => {
        result = data
        redis.del("allData")
        return redis.del("tvList")
      })
      .then((_) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json(err.response.data)
      })
  }
}


module.exports = Controller;
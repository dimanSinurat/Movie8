const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis()

class Controller {
  static getAll(req, res) {
    const response = {}

    redis.get("allData")
      .then((value) => {
        if (value) {
          res.status(200).json(JSON.parse(value));
        } else {
          axios({
            method: 'get',
            url: 'http://localhost:4001/api/v1/movie/'
          })
            .then(({ data }) => {
              response.movie = data;
               axios({
                method: 'get',
                url: 'http://localhost:4002/api/v1/tv/'
              })
                .then(({ data }) => {
                  response.tvseries = data
                  let responseString = JSON.stringify(response);
                  return redis.set("allData", responseString)
                })
                .then((_) => {
                  res.status(200).json(response)
                })
                .catch((err) => {
                  res.status(500).json({message: err})
                })
            })
        }
      })
      .catch((err) => {
        res.status(500).json({message: 'Internal Server Error' , detail : err})
      })

  }
}

module.exports = Controller
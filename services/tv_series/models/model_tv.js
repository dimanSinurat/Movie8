const { getDatabase } = require('../config');
const collectionSelected = "tvSeries"

class TvModel {
  static findTV() {
    return getDatabase().collection(collectionSelected).find().toArray()
  }

  static findOne(query) {
    return  getDatabase().collection(collectionSelected).findOne(query)
  }
  static create(data) {
    return  getDatabase().collection(collectionSelected).insertOne(data)
  }
  static update(query, newData) {
    return  getDatabase().collection(collectionSelected).updateOne(query, newData)
  }
  static delete(query) {
    return  getDatabase().collection(collectionSelected).deleteOne(query)
  }

}

module.exports = TvModel

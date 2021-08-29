const tvModel = require('../models/model_tv');
const {ObjectId} = require('mongodb');
const idFormatedLength = 24;


class Controller {
  static getAll(req, res) {
    tvModel.findTV()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json({message: 'Internal Server Error', detail: err})
    })
  }

  static getOne(req, res) {
    const {id} = req.params

    if (id.length !== idFormatedLength) {
      res.status(400).json({message: 'Bad Request', detail: `length id : expect 24 , received ${id.length}`})
    } else {
      tvModel.findOne({_id: ObjectId(id)})
      .then((data) => {
        if (data === undefined) res.status(404).json({message: 'Data is not registered'})
        else
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json({message: 'Internal Server Error', detail: err})
      })
    }
  }

  static create(req, res) {
    const {title, overview, poster_path, popularity, tags } = req.body;
    const payload = {title, overview, poster_path, popularity, tags};

    if (title.trim() && overview.trim() && poster_path.trim() && popularity % 1 !== 0 && tags[0].trim()){
      tvModel.create(payload)
      .then((data) => {
        res.status(201).json({message: 'new movie added'})
      })
      .catch((err) => {
        res.status(500).json({message: 'Internal Server Error', detail: err})
      })
    } else {
      res.status(400).json({
        message: 'Bad Request',
        detail: 'Please fill all data forms'
      })
    }
  }

  static update(req, res) {
    const {id} = req.params;
    const newValue = req.body;
    let checkPayload = [];
    let allowedInput = true


    for (const keys in newValue) {
        if(typeof newValue[keys] === 'string'){
          if (newValue[keys].trim() === "" && keys !== "popularity"){
            allowedInput = false
          }
        } else if (Array.isArray(newValue[keys])){
          if (newValue[keys][0].trim() === ""){
            allowedInput = false
          }
        } else if (Number.isInteger(newValue[keys])){
          allowedInput = false
        }
    } // to check there is value inserted

    for (const key in newValue) {
      if (key === 'title' || key === 'overview' || key === 'poster_path' || key === 'popularity' || key === 'tags' ){
        checkPayload.push('*')
      }
    } // to avoid illegal key inserted to collection data

    
    if (id.length !== idFormatedLength) {
      res.status(400).json({message: 'Bad Request', detail: `length id : expect 24 , received ${id.length}`})
    } else {

      if(checkPayload.length === Object.keys(newValue).length && allowedInput){
        tvModel.update({_id : ObjectId(id)}, {$set: newValue})
        .then(({modifiedCount, matchedCount}) => {
          if (modifiedCount > 0){
            res.status(200).json({message: 'data updated'})
          } else if (matchedCount === 0) {
            res.status(404).json({message: 'data is not registered on system', detail: "id is not recognized"})
          } else if (matchedCount === 1 && modifiedCount === 0){
            res.status(400).json({message: 'Bad Request', detail: "there is no data changed in your update form"})
          }
        })
        .catch((err) => {
          res.status(500).json({message: 'Internal Server Error'})
        })
      } else {
        res.status(400).json({
          message: 'Bad Request',
          detail: 'key inserted is not match with system or user try send data without fill all form'
        })
      }
    }
  }

  static delete(req, res) {
    const {id} = req.params

    if (id.length !== idFormatedLength) {
      res.status(400).json({message: 'Bad Request', detail: `length id : expect 24 , received ${id.length}`})
    } else {
      tvModel.delete({_id: ObjectId(id)})
      .then(({deletedCount}) => {
        if (deletedCount > 0) res.status(200).json({message: 'the data has been deleted from the database'});
        else
        res.status(404).json({message: 'Data is not registered'});
      })
      .catch((err) => {
        res.status(500).json({message: 'Server Internal Error', detail:err})
      })
    }
  }
}

module.exports = Controller
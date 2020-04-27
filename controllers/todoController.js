const { Todo } = require('../models')

class TodoController{
    static showAll(req, res){
        Todo.findAll()
            .then(data => {
                res.status(200).json({
                    todos:data
                })
            })
            .catch(err => {
                res.status(500).json({
                    error:err
                })
            })
    }
    
    static create(req, res){
        let { title, description, status, due_date } = req.body
        Todo.create({
            title,
            description,
            status: false,
            due_date
        })
            .then(data => {
                res.status(201).json({
                    todo: data
                })
            })
            .catch(err => {
                if(err.name === 'SequelizeValidationError'){ 
                    res.status(400).json({
                        error: `Validation error`     
                    })
                } else {
                    res.status(500).json({
                        error:err
                    })
                }
            })
    }

    static findById(req, res){
        let { id } = req.params
        Todo.findByPk(id)
            .then(data => {
                if(data){
                    res.status(200).json({
                        todo:data
                    })
                } else {
                    res.status(404).json({
                        error: `data not found`
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }

    static update(req, res){
        let { id } = req.params
        let { title, description, status, due_date } = req.body
        let newData = {
            title,
            description,
            status,
            due_date
        }
        Todo.update(newData, {where:{id}})
            .then(data => {
                if(data){
                    res.status(200).json({
                        todo: newData
                    })
                } else {
                    res.status(404).json({
                        error: 'Data not found'
                    })
                }
            })
            .catch(err => {
                if(err.name === 'SequelizeValidationError'){
                    res.status(400).json({
                        error: `validation error`
                    })
                } else {
                    res.status(500).json({
                        error: err
                    })
                }
            })
    }

    static delete(req, res){
        let { id } = req.params
        Todo.destroy({where:{id}})
            .then(data => {
                if(data){             
                    res.status(200).json({
                        Success: `Success delete data with id ${id}`
                    })
                } else { 
                    res.status(404).json({
                        error: `data not found`
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    error:err
                })
            })
    }
}

module.exports = TodoController
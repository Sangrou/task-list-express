const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()



let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'bbt4yt3mbezqvct'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('tasks').find().sort({importance: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addTask', (request, response) => {
    db.collection('tasks').insertOne({doThis: request.body.doThis,
    deadline: request.body.deadline, importance: 0})
    .then(result => {
        console.log('Task Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneIPoint', (request, response) => {
    db.collection('tasks').updateOne({doThis: request.body.doThis, deadline: request.body.deadline,importance: request.body.importance},{
        $set: {
            importance:request.body.importance + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Importance Point')
        response.json('IPoint Added')
    })
    .catch(error => console.error(error))

})

app.put('/subOneIPoint', (request, response) => {
    db.collection('tasks').updateOne({doThis: request.body.doThis, deadline: request.body.deadline,importance: request.body.importance},{
        $set: {
            importance:request.body.importance - 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Substracted One Importance Point')
        response.json('IPoint Substracted')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteTask', (request, response) => {
    db.collection('tasks').deleteOne({doThis: request.body.doThis})
    .then(result => {
        console.log('Task Deleted')
        response.json('Task Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
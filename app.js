const express = require('express')
const app = express()
const user1 = require('./user1.json')
const fs = require('fs')
const port = 3501

app.use(express.json())

// get whole data 
app.get('/get', (req, res) => {
    console.log(user1)
    res.send(user1)
})

// get data by id
app.get('/get/:id', (req, res) => {
    var id = req.params.id
    console.log(user1[id-1])
    res.send(user1[id-1])
})

// add the data in the user.json file
app.post('/post_data', (req,res)=>{
    var add={
        "name": req.body.name,
        "age": req.body.age,
        "lastname": req.body.lastname
    }
    user1.push(add)
    fs.writeFile('user1.json', JSON.stringify(user1),err =>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            console.log('posted...')
            res.send("data post")
        }
    })
})

app.listen(port, () => {
    console.log('server started on port 3501')
})
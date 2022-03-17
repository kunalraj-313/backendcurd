const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
const User = require('./User')

mongoose.connect("mongodb+srv://slimshady313:peaky313@cluster0.noa1o.mongodb.net/Cluster0?retryWrites=true&w=majority", () => {

    console.log('connected')
})


async function add(obj,res){
     try{
        const user= await User.create(obj)
        if(user){
            res.send("Data added Successfully")
        }
    }catch (e){
        res.send("Encountered Error while adding Data")
        console.log(e.message)
    }
}

async function search(obj,res){
    try{
       const result= await User.find(obj)
       if(result){
           console.log(obj)
           console.log(result)
           res.send(result)
       }
   }catch (e){
       res.send("User not found")
       console.log(e.message)
   }
}

async function Del(obj,res){
    try{
       const DelStat= await User.deleteOne(obj)
       console.log(DelStat)
       if(DelStat){
           res.send("Deleted Successfully")
        }
   }catch (e){
       console.log(e.message)
       res.send("Erro Occurred")
   }
}

app.get('/', (req, res) => {
    res.send('Server Running')
})

app.post('/search', (req, res) => {
   console.log(req.body)
   search(req.body,res)
})

app.post('/add', function (req, res) {
add(req.body,res)
})

app.post('/delete', function (req, res) {
Del(req.body,res)
})

app.post('/update', function (req, res) {})

app.listen(process.env.PORT || 5000)

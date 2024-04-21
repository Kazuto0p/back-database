//importing express
const express = require('express')
const mongoose = require("mongoose")
// const Signup = require("./model")
// const cardModel = require("./mode")
const cors =require('cors')
// 2.initalization
const app =express()
// middelwere || passing the parameter
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());
//api creation
app.get('/abhilash',(req,res)=>{
    res.send("I am abhilash")
})
//  api for adding data
app.post('/add',async(req,res)=>{
    var result = await new Signup(req.body)
    result.save()
    res.send("data added")

})
//api for login
app.post("/login", (req, res) => {
    const { oname, opass } = req.body;
    Signup.findOne({ oname: oname })
        .then(user => {
            if (user) {
                if (user.opass === opass) {
                    res.json("success")
                } else {
                    res.json("password is incorrect")
                }
            } else {
                res.json("no data existed")
            }
        })
        .catch(err => console.log(err));
})

// code to add data to card
// app.post('/add1',async(req,res)=>{
//     var data = await new cardModel(req.body)
//     data.save()
//     res.send("data added")
// })


//to view the card deytails
// app.get('/view',async(req,res)=>{
//     let data = await cardModel.find()
//     res.json(data)
//     console.log("data")
// })

// 4.port
app.listen(3006,()=>{
    console.log("port 3006 is up and running")
});
mongoose.connect("mongodb+srv://ajayparappallil:ajay@cluster0.glke4um.mongodb.net/gptc_mern?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("db connected")
    })
    .catch(err => console.log(err))

let mongoschema = mongoose.Schema
const SignupSchema = new mongoschema({
    oname: String,
    onumber: Number,
    omail: String,
    opass: String
})

var Signup = mongoose.model("Signup", SignupSchema)
module.exports = Signup
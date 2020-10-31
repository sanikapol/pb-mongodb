//Budget API

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const fs = require('fs')

const mongoose = require('mongoose')
const budgetsModel = require('./models/budgets_schema.js')
const bodyParser = require('body-parser')

let url = 'mongodb://localhost:27017/chart_data';

app.use(cors());
app.use(bodyParser.json())



app.use('/',express.static('public'));

//Fetches data from DB
app.get('/budget', (req,res) => { 
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(()=> {
            console.log("Connected to DB");
            budgetsModel.find({})
                      .then((data) =>{
                          console.log(data);
                          res.send(data);
                          mongoose.connection.close();
                      })
                      .catch((connectionError) =>{
                          console.log(connectionError);
                      })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
    
});

//Inserts data into DB
app.post('/budget', (req,res) => { 
    mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true} )
        .then(()=> {
            console.log("Connected to DB");
            let data = new budgetsModel(req.body);
            console.log(data);
            budgetsModel.insertMany(data)
                      .then((data) =>{
                          console.log(data);
                          res.status(200).send("Data inserted Successfully");
                          mongoose.connection.close();
                      })
                      .catch((connectionError) =>{
                          console.log(connectionError);
                          res.status(400).send();
                      })
        })
        .catch((connectionError) => {
            console.log(connectionError);
            res.status(400).send();
        })
    
});

// app.get('/budget', (req,res) => { 
//     try{
//         const dataBuffer = fs.readFileSync('budget.json')
//         console.log(dataBuffer)
//         const budget = JSON.parse(dataBuffer);
//         console.log(budget)
//         res.json(budget);
//     }catch (err){
//         console.log(err)
//         res.send("Something went wrong")
//     } 
    
// });

app.listen(port, () => {
    console.log(`API serverd at http//:localhost${port}`)
});
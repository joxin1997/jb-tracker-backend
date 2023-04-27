const express = require('express');
const mongoose = require('mongoose');
let cors = require('cors');

let body_parser = require('body-parser');

const app = express();
const employeeRoute = require('./Routes/employeeRoutes')
const mongoURL = 'mongodb://localhost:27017/tracker';
// const mongoURL = 'mongodb+srv://joxinsaji30:cozENMB0nHcbS1RE@budgetcluster.sutxkci.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())
app.use(employeeRoute);

mongoose.connect(mongoURL).then(() => {
    console.log('Database is UP')
}).catch(()=>{
    console.log("Database is Down");
});

app.listen(5000,()=>{
    console.log("Tracker is live on PORT : ",5000);
})
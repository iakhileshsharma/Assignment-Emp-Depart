const express = require('express');
const mongoose = require('mongoose');
const app = express();
const employees = require('./Routes/employee');
const departments = require('./Routes/department');


mongoose.connect('mongodb://localhost/Employee-department')
.then(()=> console.log('Connection is successful to Database'))
.catch(err => console.error('coudlnt connect to database', err))


app.use(express.json());
app.use('/employees', employees);
app.use('/departments', departments);



app.listen(3000, ()=>{
    console.log('port is running on 3000');
});
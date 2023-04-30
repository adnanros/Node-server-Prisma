const express = require('express');
const app = express();



const {login, register} = require('./controllers/AuthController')


app.get('/', (req,res)=>{
    res.send('Initialize Project');
});

app.post('/register', register);
app.post('/login', login);


module.exports.app = app;
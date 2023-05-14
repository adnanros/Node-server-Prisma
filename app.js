const express = require('express');
const app = express();
app.use(express.json());



const {login, register} = require('./controllers/AuthController')


app.get('/', (req,res)=>{
    res.status(200).send('Hi from the base route');
});

app.post('/register', register);
app.post('/login', login);


module.exports.app = app;
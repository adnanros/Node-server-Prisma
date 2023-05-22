const express = require('express');
const app = express();
app.use(express.json());



const {login, register} = require('./controllers/AuthController');
const {index, store} = require('./controllers/SampleCatController');


app.get('/', (req,res)=>{
    res.status(200).send('Hi from the base route');
});

app.post('/register', register);
app.post('/login', login);
app.get('/admin/sampleCategory', index);
app.post('/admin/sampleCategory', store);


module.exports.app = app;
const express = require('express');
const app = express();
app.use(express.json());



const {login, register} = require('./controllers/AuthController');
const sampleCategory = require('./controllers/SampleCatController');
const testGroup = require('./controllers/TestGroupController');


app.get('/', (req,res)=>{
    res.status(200).send('Hi from the base route');
});

app.post('/register', register);
app.post('/login', login);

app.post('/admin/sampleCategory', sampleCategory.store);
app.get('/admin/sampleCategory/:id', sampleCategory.findById);
app.get('/admin/sampleCategory', sampleCategory.index);
app.post('/admin/testGroup', testGroup.store);
app.get('/admin/testGroup/:id', testGroup.findById);
app.get('/admin/testGroup/bySampleCategoryId/:id', testGroup.findBySampleCategoryId);
app.get('/admin/testGroup', testGroup.index);



module.exports.app = app;
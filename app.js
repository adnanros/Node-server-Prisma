const express = require('express');
const app = express();
app.use(express.json());



const {login, register} = require('./controllers/AuthController');
const sampleCategory = require('./controllers/SampleCatController');
const testGroup = require('./controllers/TestGroupController');
const testPack = require('./controllers/TestPackController');
const testPacksOnTestGroups = require('./controllers/TestPacksOnTestGroupsController');


app.get('/', (req,res)=>{
    res.status(200).send('Hi from the base route');
});

app.post('/register', register);
app.post('/login', login);


app.post('/admin/sampleCategory', sampleCategory.store);
app.patch('/admin/sampleCategory/edit', sampleCategory.edit);
app.get('/admin/sampleCategory/:id', sampleCategory.findById);
app.get('/admin/sampleCategory', sampleCategory.index);
app.delete('/admin/sampleCategory/:id', sampleCategory.remove);

app.post('/admin/testGroup', testGroup.store);
app.patch('/admin/testGroup/edit', testGroup.edit);
app.get('/admin/testGroup/:id', testGroup.findById);
app.get('/admin/testGroup/bySampleCategoryId/:id', testGroup.findBySampleCategoryId);
app.get('/admin/testGroup', testGroup.index);
app.delete('/admin/testGroup/:id', testGroup.remove);

app.post('/admin/testPack', testPack.store);
app.patch('/admin/testPack/edit', testPack.edit);
app.get('/admin/testPack/:id', testPack.findById);
app.get('/admin/testPack', testPack.index);
app.delete('/admin/testPack/:id', testPack.remove);

app.post('/admin/testPacksOnTestGroups', testPacksOnTestGroups.store);
app.patch('/admin/testPacksOnTestGroups/edit', testPacksOnTestGroups.edit);
app.get('/admin/testPacksOnTestGroups/testPackId/:testPackId', testPacksOnTestGroups.findByTestPackId);
app.get('/admin/testPacksOnTestGroups/testGroupId/:testGroupId', testPacksOnTestGroups.findByTestGroupId);
app.get('/admin/testPacksOnTestGroups', testPacksOnTestGroups.index);
app.delete('/admin/testPacksOnTestGroups', testPacksOnTestGroups.remove);



module.exports.app = app;
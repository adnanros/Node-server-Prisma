const axios = require('axios');
const baseUrl = 'http://127.0.0.1:3000';

describe('The main routes', ()=>{
    test('The base get route', async()=>{
        const res = await axios.get(baseUrl);

        expect(res).toBeTruthy();
        expect(res.status).toBe(200);
        expect(res.data).toEqual('Hi from the base route');

    })
})

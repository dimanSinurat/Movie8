const express = require('express');
const app = express();
const port = 4001;
const {run} = require('./config');
const MovieRoute = require('./routes');

run().catch(console.dir);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/v1/movie', MovieRoute);



app.listen(port, ()=> console.log(`server listen on port ${port}`));
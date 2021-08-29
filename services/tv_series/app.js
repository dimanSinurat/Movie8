const express = require('express');
const app = express();
const port = 4002;
const {run} = require('./config');
const TvRoute = require('./routes');

run().catch(console.dir);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/v1/tv', TvRoute);



app.listen(port, ()=> console.log(`server listen on port ${port}`));
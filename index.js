const groceriesRoute = require('./Routes/template');
const authRoute = require('./Routes/auth');
const express = require('express');
const isAuth = require('./utils/isAuth');
require('./Database/mongo');
const app = express();
const PORT = 8080;



app.use(express.json());
app.use(express.urlencoded());


app.use((req,res,next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});


//login and register routes
app.use('/api/v1/auth',authRoute);



app.use('/api/v1', isAuth ,groceriesRoute);

app.listen(PORT, () => `Port :${PORT}`);




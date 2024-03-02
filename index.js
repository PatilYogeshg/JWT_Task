const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('./Utils/logger');
const Port = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' }))
app.use(cors());
app.use(cookieParser());
const path = require('path');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

require('./DB/conn');

require('./MainRoutes')(app);


app.listen(Port, () => {
    logger.info(`connection Established at port ${Port}`)
})
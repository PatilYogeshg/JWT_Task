const mongoose = require('mongoose');
const logger = require('../Utils/logger');

const  {DevServer} = require('./config');

const DB = DevServer.url;

mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    logger.info('Database connection success');
}).catch((e) => {
    logger.error(e)
})
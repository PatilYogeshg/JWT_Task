const express = require('express');
const app = express();


const UserLogin = require('./Controller/UserCreation/UserRoues') 


module.exports = (app) => {
    app.use('/UserLogin', UserLogin);
}
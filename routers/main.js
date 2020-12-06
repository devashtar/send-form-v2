const route = require('express').Router();
const path = require('path');

route.get('/', (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

module.exports = route;
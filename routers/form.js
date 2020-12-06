const route = require('express').Router();
const path = require('path');

route.get('/form', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'form.html'));
})

module.exports = route;
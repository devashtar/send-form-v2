const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const favicon = require('serve-favicon');
const path = require('path');

const homePage = require('./routers/main');
const formPage = require('./routers/form');
const uploader = require('./routers/upload');

const port = process.env.PORT || 3000;

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public'), {index: false}));

app.use(homePage);
app.use(formPage);
app.use(uploader);


server.listen(port, () => {
  console.log('SERVER IS RUN!!!');
})


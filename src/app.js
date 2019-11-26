const http = require('http');
const express = require('express');
const httProxy = require('express-http-proxy')
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const alunoServiceProxy = httpProxy('http://localhost:3001');
const professoresServiceProxy = httpProxy('http://localhost:3002');

app.get('/professores', (req, res, next) => {
    professoresServiceProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);
server.listen(env.process.PORT)
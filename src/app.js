const http = require('http');
const express = require('express');
const httpProxy = require('express-http-proxy')
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
require('dotenv').config()

const professoresServiceProxy = httpProxy(`${process.env.URL_PROFESSORES}:${process.env.PORT_PROFESSORES}`);
const alunosServiceProxy = httpProxy(`${process.env.URL_ALUNOS}:${process.env.PORT_ALUNOS}`);

app.get('/professores', (req, res, next) => {
    professoresServiceProxy(req, res, next);
})

app.get('/alunos', (req, res, next) => {
    alunosServiceProxy(req, res, next);
})

console.log(process.env.PORT_ALUNOS);

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);
server.listen(process.env.GATEWAY_PORT, () => {
    console.log(`listem to port ${process.env.GATEWAY_PORT}`)
})

app.get('/', (req, res, next) => {
    res.send(`welcome to /`);
})
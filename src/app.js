const http = require('http');
const express = require('express');
const httpProxy = require('express-http-proxy')
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
require('dotenv').config()

var port = process.env.PORT || 4000;

const auth = require('./controllers/autenticacao');
const alunosServiceProxy = httpProxy(`${process.env.URL_ALUNOS}:${process.env.PORT_ALUNOS}`);
const professoresServiceProxy = httpProxy(`${process.env.URL_PROFESSORES}`);
const cursoServiceProxy = httpProxy(`${process.env.URL_CURSOS}`);
const uploadsServiceProxy = httpProxy(`${process.env.URL_UPLOADS}`);
const autenticacaoServiceProxy = httpProxy(`${process.env.URL_AUTENTICACAO}`)


app.all('/professores*', auth.verificaToken, (req, res, next) => {
    professoresServiceProxy(req, res, next);
});

app.all('/alunos*', auth.verificaToken, (req, res, next) => {
    alunosServiceProxy(req, res, next);
});

app.all('/api/cursos*', auth.verificaToken, (req, res, next) => {
    cursoServiceProxy(req, res, next);
});

app.all('/uploads*', auth.verificaToken, (req, res, next) => {
    uploadsServiceProxy(req, res, next);
});

app.all('/autenticacao/*', (req, res, next) => {
    autenticacaoServiceProxy(req, res, next);
});

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`listem to port ${port}`)
})

app.get('/', (req, res, next) => {
    res.send(`welcome to /`);
})

const jwt = require('jsonwebtoken');
const request = require('request');

exports.verificaToken = async (req, res, next) => {
    const token = req.get('x-auth-token');
    if (!token) res.status(403).send("Por favor, insira o token.");
    else {
        try {
            let usuarioDecoded = await jwt.verify(token, process.env.SECRET);
            // let usuarioEncontrato = await fetch(`${process.env.URL_AUTENTICACAO}/usuarios/${usuarioDecoded.id}`);
            // let usuarioRole = await usuarioEncontrato.json();
          
            // if ((usuarioRole == 'aluno') && (req.path == "/professores")) {
            //     res.status(401).json({
            //         messageError: "Usuário não autorizado!"
            //     })
            // }
           next();
        } catch(err) {
            res.status(401).send(err);
        }
    }
}
const jwt = require('jsonwebtoken');
const fetch = require("node-fetch");

exports.verificaToken = async (req, res, next) => {
    const token = req.get('x-auth-token');
    if (!token) res.status(403).send("Por favor, insira o token.");
    else {
        try {
            let usuarioDecoded = await jwt.verify(token, process.env.SECRET);
            const url = `${process.env.URL_AUTENTICACAO}/usuarios/${usuarioDecoded.id}`;
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    if ((json.role != 'admin') && (req.method == 'POST')) {
                        res.status(401).json({
                            messageError: "Usuário sem permissão necessária para esta funcionalidade"
                        });
                    } 
                    else if ((json.role == 'aluno') && (req.path.includes("professores"))) {
                        res.status(401).json({
                            messageError: "Usuário não autorizado!"
                        });
                    }
                    else {
                        next();
                    }
                } catch (error) {
                    res.status(401).json({
                        messageError: error
                    })
                }
        } catch (err) {
            res.status(401).send(err);
        }
    }
}
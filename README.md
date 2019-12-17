# Desenvolvimento de componentes e serviços

### API Gateway do sistema academico da cadeira de Desenvolvimento de componentes e serviços


#### Url:

```
https://dcs-api-gateway.herokuapp.com/
```
#### Endpoints:

- /upload
- /professores
- /alunos
- /curso
- /autenticacao:
  - /autentica
  - /verifica
  - /usuarios
  
#### /usuarios:

##### cria usuario

payload

```
{ 
  "email": "teste@teste.com",
  "password": "1234",
  "role": "admin"
}
```

- Obs: O campo role é um enum, e só aceita os seguintes valores: "aluno", "professor", "admin" 

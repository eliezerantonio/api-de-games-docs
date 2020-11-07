# API de Games

##Endpoints
### GET /games

esse endpoint retorna todos dos dados cadastrados no banco de dados

#### paramentros
Nenhum
#### Respostas
##### OK! 200

Caso essa resposta aconteca voce vai receber a listagem de todos os games

Exemplo de resposta:
```
[
    {
        "id": 23,
        "title": "Call of duty MW",
        "year": 2019,
        "price": 60
    },
    {
        "id": 65,
        "title": "Sea of thieves",
        "year": 2018,
        "price": 40
    },
    {
        "id": 2,
        "title": "Minecraft",
        "year": 2012,
        "price": 20
    }
]
```
##### Falha na autenticacao! 401
Caso essa resposta signfica qu aconteceu alguma falha durante o processo de autenticacao da requiscao.Motivos: Token 
invalido, Token expirado
exemplo de resposta"
```
{
    "err": "Token invalido"
}
```

### POST /auth

esse endpoint responsavel por fazer processo de login

#### paramentros

email: E-mail do usuario cadastrado no sistema
password: senha do usuario cadastrado no sistema, com o seu determinado email
exemplo:

```
{
    "email":"eliezer@gmail.com",
    "password":"eliezer"
}

```

#### Respostas
##### OK! 200

Caso essa resposta aconteca voce vai receber o token JWT para conseguir acessar endpoinst protegidos na api

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlbGllemVyQGdtYWlsLmNvbSIsImlhdCI6MTYwNDczNTM2MywiZXhwIjoxNjA0ODIxNzYzfQ.9gltZl9bH5OSMUXgwu69Svz12VQeY8qGRvCP6Jmb2jk"
}
```
##### Falha na autenticacao! 401
Caso essa resposta signfica qu aconteceu alguma falha durante o processo de autenticacao da requiscao.Motivos: Senha ou email errado
exemplo de resposta"
```
{
    "err": "Credencial invalido"
}

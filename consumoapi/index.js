const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const JWTSecret = "sa4ttrgsaaslajdaasasiy49ascsgdthrhvdrgdgdg";

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//MIDDLEAWARE
function auth(req, res, next) {
    const authToken = req.headers['authorization'];


    if (authToken != undefined) {

        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token, JWTSecret, (err, data) => {
            if (err) {
                res.status(401);
                res.json({ err: "Token invalido" });
            } else {
                //CASO SEJA VALIDO
                req.token = token;
                req.loggedUser = {
                    id: data.id,
                    email: data.email
                };
                next();
            }
        })
    } else {
        res.status(401);
        res.json({ err: "Token invalido" })
    }

}

var DB = {
    games: [{
            id: 23,
            title: "Call of duty MW",
            year: 2019,
            price: 60
        },
        {
            id: 65,
            title: "Sea of thieves",
            year: 2018,
            price: 40
        },
        {
            id: 2,
            title: "Minecraft",
            year: 2012,
            price: 20
        }
    ],
    users: [{
            id: 1,
            name: "Eliezer Antonio",
            email: "eliezer@gmail.com",
            password: "eliezer"
        }, {
            id: 20,
            name: "fernando",
            email: "fernado@gmail.com",
            password: "fernando"
        }


    ]
}

app.get("/games", auth, (req, res) => {

    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/game/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {

        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }
});

app.post("/game", auth, (req, res) => {
    var {
        title,
        price,
        year
    } = req.body;
    DB.games.push({
        id: 2323,
        title,
        price,
        year
    });
    res.sendStatus(200);
})

app.delete("/game/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if (index == -1) {
            res.sendStatus(404);
        } else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
});

app.put("/game/:id", auth, (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {

        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {

            var {
                title,
                price,
                year
            } = req.body;


            if (title != undefined) {
                game.title = title;
            }

            if (price != undefined) {
                game.price = price;
            }

            if (year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);

        } else {
            res.sendStatus(404);
        }
    }

});

app.post("/auth", (req, res) => {
    var {
        email,
        password
    } = req.body


    ///Validacao email
    if (email != undefined) {
        var user = DB.users.find(u => u.email = email);
        if (user != undefined) {
            //validacao senha

            if (user.password == password) {
                //gerando token
                //payload
                jwt.sign({ id: user.id, email: user.email }, JWTSecret, { expiresIn: '24h' }, (err, token) => {
                    if (err) {
                        res.status(400);
                        res.json({ err: 'falha interna' });
                    } else {
                        res.status(200);
                        res.json({ token: token })
                    }
                })


            } else {
                res.status(401);
                res.json({ err: "Credecnial envalido" })
            }

        } else {
            res.status(404);
            res.json({ err: "o email enviado nao existe na base de dados" })
        }

    } else {
        res.status(400);
        res.json({ err: "Email enviado invalido" })
    }

})

app.listen(3000, () => {
    console.log("API RODANDO!" + 3000);
});
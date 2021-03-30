// ------ Importar dependencias ------
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv').config();
const {MongoClient} = require('mongodb');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const randomstring = require("randomstring");
const URL = process.env.MONGODB;
const optionsMongo = { useNewUrlParser: true, useUnifiedTopology: true } 

// ------ Configuración inicial ------
const server = express();
const listenPort = process.env.PORT || 8080;
server.use(cors());

// HAY QUE APUNTAR AL FRONT ("/Public")
const staticFilesPath = express.static(__dirname + '/public');
server.use(staticFilesPath);

// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Levantar el Servidor
server.listen(listenPort,
    () => console.log(`Server listening on ${listenPort}`)
);

// VALIDATION
const validarEmail = mail => (/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(mail));

// PETICION POST  (Login with md5 and returns TOKEN)
server.post('/user/login', (req, res) => {
    const USER = { 
        email: req.body.email,
        pass: md5(req.body.pass)
    }

    if (validarEmail(req.body.email)) {
        MongoClient.connect(URL, optionsMongo, (err, db) => {
            try {
                db.db("quizz")
                    .collection("teacher")
                    .findOne(USER, (err, result) => {
                        if (err) throw err;
                        if (result === null) {
                            res.status(401).json({
                                status: 401,
                                data: "Email o contraseña incorrect@s",
                                ok: false,
                            })
                        }
                        else {
                            // TOKEN JWT
                            let token = jwt.sign({ email: USER.email }, result.secret, {expiresIn: 60*60})
                            res.status(200).json({
                                status: 200,
                                data: token,
                                ok: true,
                            })
                            db.close();
                        }
                    })
            }
            catch(exception) {
                res.send("Error con la base de datos")
            }
        })
    } else {
        res.status(400).json({
            status: 400,
            data: "Email no valido, debes meter un correo correcto",
            ok: false,
        })
    }
})

// LEER TEACHER
server.get('/teacher/read', (req, res) => {
    try {
        MongoClient.connect(URL, (err, db)=> {
            try {
                db.db("quizz")
                    .collection("quest")
                    .find({}).toArray( (err, result) => {
                        if (err) throw err;
                        res.send(result);
                        db.close();
                    })
            }
            catch {
                console.log("Error 1");
            }
        })
    } catch {
        res.send("No se conecta")
        console.log("no se conecta");
    }
})

// LEER USER
server.get('/user/read', (req, res) => {
    try {
        MongoClient.connect(URL, (err, db)=> {
            try {
                db.db("quizz")
                    .collection("quest")
                    .find({}).toArray( (err, result) => {
                        if (err) throw err;
                        res.send(result);
                        db.close();
                    })
            }
            catch {
                console.log("Error 1");
            }
        })
    } catch {
        res.send("No se conecta")
        console.log("no se conecta");
    }
})

// CREAR PREGUNTA
server.post('/teacher/create', (req, res) => {
    console.log(req.body);

    const newQuest = {
        preguntas: req.body.pregunta,
        respuestas: req.body.respuestas,
        respuestaCorrecta: req.body.respuestaCorrecta
    }

    MongoClient.connect(URL, optionsMongo, (err, db) => {
        try {
            db.db("quizz")
                .collection("quest")
                .insertOne(newQuest, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.status(200).json({
                            status: 200,
                            data: "New question added",
                            ok: true
                        })
                    }
                })
            }
            catch {
                res.status(401).json({
                    status:401,
                    data: "Error",
                    ok: false
                })
            } 

    })
})

// DELETE
server.delete('/teacher/delete', (req, res) => {
    const delet = {
        preguntas: req.body.pregunta,
    }

    MongoClient.connect(URL, optionsMongo, (err, db) => {
        try {
            db.db("quizz")
                .collection("quest")
                .deleteOne(delet, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.status(200).json({
                            status: 200,
                            data: "Question deleted",
                            ok: true
                        })
                    }
                })
            }
            catch {
                res.status(401).json({
                    status:401,
                    data: "Error",
                    ok: false
                })
            } 

    })
})

// EDIT
server.put('/teacher/edit', (req, res) => {
    const edit = {
        preguntas: req.body.preguntas,
        respuestas: [req.body.respuestas[0], req.body.respuestas[1], req.body.respuestas[2], req.body.respuestas[3]],
        respuestaCorrecta: req.body.respuestaCorrecta
    }

    MongoClient.connect(URL, optionsMongo, (err, db) => {
        try {
            db.db("quizz")
                .collection("quest")
                .updateOne({preguntas: req.body.preguntas}, {$set: edit}, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.status(200).json({
                            status: 200,
                            data: "Question edited",
                            ok: true
                        })
                    }
                })
            }
            catch {
                res.status(401).json({
                    status:401,
                    data: "Error",
                    ok: false
                })
            } 

    })
})

// LOGOUT (Cargarse el puto token)
server.put('/teacher/logout', (req, res) => {
    try {
        let decode = jwt.decode(req.headers.authorization);
        if (decode.email){ 
            MongoClient.connect(URL, (err, db)=> {
                try {
                    db.db("quizz")
                        .collection("teacher")
                        .updateOne({email: decode.email}, {$set: {secret: randomstring.generate()}}, (err, result) => {
                            try {
                                res.status(200).json({
                                    data: "Logout de puits",
                                    ok: true
                                })
                                db.close();
                            }
                            catch {
                                res.status(401).json({
                                    status:401,
                                    data: "Algo va mal... ",
                                    ok: false,
                                })
                                console.log(err);
                            }
                        })
                }
                catch {
                    res.status(401).json({
                        status:401,
                        data: "Algo va mal... No conecta",
                        ok: false,
                    })
                }
            })
        }
    }
    catch {
        res.status(401).json({
            status:401,
            data: "¡No tienes token chaval!",
            ok: false,
        })
    }
})

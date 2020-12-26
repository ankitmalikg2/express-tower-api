var admin = require('firebase-admin');
var firebase = require("firebase/app");
require("firebase/auth");
var firebaseConfig = require("../../config/firebaseConfig")

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

function getAuthToken(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
            res.status(200).json(user)
        })
}

function verifyAuthToken(req, res, next) {
    var authorizationToken = req.headers.authorization
    var token = ""
    console.log(token)
    if (authorizationToken != undefined && authorizationToken != "") {
        token = authorizationToken.split(" ")[1]
    }
    app.auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            next()
        }).catch(function (err) {
            console.log(err)
            res.status(401).json({
                "status": 401
            })
        })
}


module.exports = {
    getAuthToken: getAuthToken,
    verifyAuthToken: verifyAuthToken
}

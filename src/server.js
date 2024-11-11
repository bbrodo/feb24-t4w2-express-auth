require("dotenv").config();
const express = require("express");
const { User } = require("./models/UserModel");
const { generateJWT, validateUserAuth } = require("./functions/jwtFunctions");

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    response.json({
        message: "Hello world"
    })
});


app.post("/signup", async (request, response) => {
    let username = request.body.username;
    let password = request.body.password;

    if (!username || !password) {
        response.status(400).json({
            message: "Incorrect or missing sign-up credentials provided."
        });
    }


    let newUser = await User.create({username: username, password: password});

    let newJwt = generateJWT(newUser.id, newUser.username)

    response.json({
        jwt: newJwt,
        user: {
            id: newUser.id,
            username: newUser.username
        }
    })
})

app.get("/protectedRoute", validateUserAuth, (request, response) => {
    response.json({
        message: "You can see prtected content because you are signed in"
    })
})

module.exports = {
    app
}
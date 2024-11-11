require("dotenv").config();
const jwt = require("jsonwebtoken")

let jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;

function generateJWT(userId, username, roles = null) {

    return jwt.sign(
        {
        userId: userId,
        username: username,
        roles: roles
        },
        jwtSecretKey,
        {
            expiresIn: '7d'
        }
    )
}

async function decodeJWT(tokenToDecode) {
    
}

async function validateUserAuth(request, response, next) {
    
}

module.exports = {
    generateJWT,
    decodeJWT,
    validateUserAuth
}

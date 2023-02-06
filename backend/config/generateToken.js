const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

//generating the jwt token
const generateToken = (id) => {
    return jwt.sign({id}, JWT_SECRET, {expiresIn:"30d"})
}

// jwt.sign(id, jwt secret, expiry time)

module.exports = generateToken
const jwt = require('jsonwebtoken');

const SECRET_KEY = '253d8d9ccba3a2417ce2ae9fdb54ab176954ca14dd1e362a80196d7a09d4fa9a7936b84496fbab1b393cad64ba40aecf115903b9f4cc539e802f7744403fd6a3';

const generateToken = (user) => {
    // Generate a JWT token with user id and email in the payload
    return jwt.sign(
        { id: user.id, email: user.email }, // Payload
        SECRET_KEY, // Secret key for signing the token
        { expiresIn: '1h' } // Token expiration time
    );
};

//validate the token
const validateToken = (token) => {
    try {
        // Verify the JWT token
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        // Throw a new error if verification fails
        throw new Error('Invalid or expired token');
    }
};

module.exports = { generateToken, validateToken };
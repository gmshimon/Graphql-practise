const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const {typeDefs,resolvers} = require('./schema/index')

const { validateToken } = require('./auth/auth');

dotenv.config();

const startServer = async () => {
    const app = express();

    // Connect to MongoDB
    mongoose.connect('mongodb://localhost:27017/graphqlDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

    // Initialize Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers,
        context:({req})=>{
            const token = req.headers.authorization || '';
            if(token){
                try {
                    const user = validateToken(token.replace('Bearer ',''))
                    return { user };
                } catch (error) {
                    throw new Error('Invalid or expired token')
                }
            }
            return {};
        }
     });
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();

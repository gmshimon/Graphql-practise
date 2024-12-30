const { generateToken } = require("../../auth/auth");
const User = require("../../models/User");


const userResolvers = {
    Query: {
        users: async (_,__,context) => {
            // if(!context.user){
            //     throw new Error('Not authenticated');
            // }
            return await User.find()
        },
        user: async (_, { id }) => {
            const user = await User.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        },
    },
    Mutation: {
        register:async(_,{name,email,password}) => {
            const existingUser = await User.findOne({email});
            if(existingUser) {
                throw new Error('Email already exists');
            }

            const user = new User({name,email,password});
            await user.save();

            const token = generateToken(user);
            return {
                token,
                user,
            };
        },

        login:async(_,{email,password})=>{
            const user = await User.findOne({email});

            if(!user){
                throw new Error('Invalid credentials');
            }

            const isMatch = await user.comparePassword(password);
            if(!isMatch){
                throw new Error('Invalid credentials');
            }
            
            const token = generateToken(user);
            return {
                token,
                user,
            };
        }
    },
};

module.exports = userResolvers;

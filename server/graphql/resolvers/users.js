const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config")

module.exports = {
    Mutation: {
        async registerUser(_, {registerInput: {name, email, password} }) {
            // check if user exist
            const oldUser =  await User.findOne({ email });

            // throw user exist error
            if (oldUser) {
                throw new ApolloError('User Exist', 'USER_ALREADY_EXISTS');
            }

            // encrypt pass
            var encryptedPassword = await bcrypt.hash( password, 10 )

            //build mongo model
            const newUser = new User ({
                name: name,
                email: email.toLowerCase(),
                password: encryptedPassword

            });

            // create jwt and attach to user model
            const secret = config.secret;
            const token = jwt.sign(
                { user_id: newUser._id, email },
                secret,
                {
                    expiresIn: "2h"
                }
            );
            newUser.token = token;

            // save user in mongo
            const res = await newUser.save();
            return {
                id: res.id,
                ...res._doc
            };
        },
        async loginUser(_, {loginInput: {email, password} }) {
            // valid user
            const user =  await User.findOne({ email });

            // check pass
            if (user && (await bcrypt.compare( password, user.password))) {
                // create token
                const secret = config.secret;
                const token = jwt.sign(
                    { user_id: user._id, email },
                    secret,
                    {
                        expiresIn: "2h"
                    }
                );
                // attach token to user model
                user.token = token;
                return {
                    id: user.id,
                    ...user._doc
                };
            } else {
                //error
                throw new ApolloError('Password Incorrect', 'PASSWORD_INCORRECT');
            }

        }
    },
    Query: {
        getUsers: async () => { 
            return await User.find()
        },
        //resolver function for greeting
        greeting: async (_,{}) => {
            const data = "hello world !!!"
            return data
        },
        getUser: async (_, {email}) => {
            const user = User.findOne({ email })
            if (!user) {
                throw new Error("User Doesn't Exist")
            }
            else {
                return user
            }
        },
        getUserById: async (_, {_id}) => {
            const user = User.findById(id)
            if (!user) {
                throw new Error("User Doesn't Exist")
            }
            else {
                return user
            }
        }
    },
}
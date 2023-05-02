const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    connectionString: process.env.Mongo_URL,
    port: process.env.PORT,
    www_port: process.env.WWW_PORT
};

require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    DATABASE: process.env.DATABASE || 'mongodb',
    MONGO_URI: process.env.MONGO_URI,
}
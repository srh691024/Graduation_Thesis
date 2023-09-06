require('dotenv').config()
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@couplesocialnetwork.9ndc9nm.mongodb.net/`)
        console.log('MongoDB connect SUCCESSFUL');
    } catch (e) {
        console.log(e.message)
        console.log('MongoDB connect FAIL')
    }
}

module.exports = { connect }
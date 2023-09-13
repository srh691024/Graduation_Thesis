require('dotenv').config()
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('MongoDB connect SUCCESSFUL');
    } catch (e) {
        console.log(e.message)
        console.log('MongoDB connect FAIL')
    }
}

module.exports = { connect }
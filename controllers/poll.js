const { response } = require('express');
const Poll = require('../models/pollSchema');
const bcrypt = require('bcryptjs');

const getPollsFromDB = async () => {
    console.log('GET POLLs ******');
    const polls = await Poll.find({  })
    return polls;
}

module.exports={
    getPollsFromDB,
};
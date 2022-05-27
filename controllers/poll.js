const { response } = require('express');
const Poll = require('../models/pollSchema');
const bcrypt = require('bcryptjs');

const getPollsFromDB = async(req, res = response) => {
    console.log('GET POLLs ******');
    console.log(req.body);

    const polls = await Poll.find({  })

    res.json({
        ok: true,
        polls: polls,
      });
}

module.exports={
    getPollsFromDB,
};
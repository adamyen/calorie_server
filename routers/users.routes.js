const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model');

router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.send('Error' + err)
    }
});

module.exports = router;

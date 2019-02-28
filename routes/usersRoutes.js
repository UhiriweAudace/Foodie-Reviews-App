const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

//Load the Models
const User = require('../models/Users');


/** POST //return Jwt Token */
router.post('/login', async (req, res, next) => {

    //Find user by email
    let user = await User.findOne({
        email: req.body.email
    }).populate('user', ['_id', 'email']);
    if (!user) return res.status(404).send({
        email: "invalid email or Password..."
    })

    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({
        message: "invalid email or Password..."
    });

    const payload = {
        id: user.id,
        email: user.email
    };

    jwt.sign(payload, keys.secretOrKey, {
        expiresIn: 3600
    }, (err, token) => {
        return res.header("Authorization", "Bearer " + token).send({
            message: "successfully logged in",
            userId: user._id,
            token: token
        });

    });

})

router.post('/signup', async (req, res, next) => {
    let user = await User.findOne({
        email: req.body.email
    });

    if (user) return res.status(400).send({
        message: "email already exists..."
    });

    user = new User({
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user, ['_id', 'email']));

});

// return current user and Private Access
router.get('/current', isAuth, (req, res) => {
    res.send(_.pick(req.user, ['_id', 'email']))
})

module.exports = router;
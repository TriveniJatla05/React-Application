var router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../models/User');

router.post('/',
    [
        check('name', 'Please provide name').not().isEmpty(),
        check('email', 'Please provide valid email').isEmail(),
        check('password', 'Please provide 6 characters password').isLength({ min: 6 })
    ],
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        //res.send('success')
        const { name, email, password } = req.body;
        console.log("name = "+name);
        console.log("email = "+email);
        console.log("password = "+password);
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'user already exists' })
            }
            user = new User({
                name,
                email,
                password
            })
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            console.log("ecrypted password = "+password)
            await user.save()

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, process.env.SECRET, {
                expiresIn: 3600
            }, (err, token) => {
                if (err) throw err
                res.send({ token })
            })
        } catch (error) {
            console.error(err.message)
            res.status(500).send('server error')
        }
    })

    module.exports = router;
    
    
        // router.get('/test', function (req, res) {
        //     res.send('get request successed...!');
        // })
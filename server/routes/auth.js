var router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

//User Model
const User = require('../models/User');

router.get('/', auth, async function (req, res) {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.post('/',
    [
        check('email', 'Please provide valid email').isEmail(),
        check('password', 'Please provide 6 characters password').exists()
    ],
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }

        const { email, password } = req.body;
        console.log("Login email = "+email);
        console.log("Login password = "+password);
        try {
            let user = await User.findOne({ email });
            
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentails' })
            }
            //if user email is found in database we will check password
            const match = await bcrypt.compare(password, user.password)
            console.log("is password matched = "+match);
            if (!match) {
                return res.status(400).json({ msg: 'Invalid Credentails' })
            }
            //localStorage.setItem("UserName",user.name);
            //if both email and password matched will do payload jsonwebtoken etc...!
            const payload = {
                user: {
                    id: user.id,
                    userName: user.name
                }
            }
            console.log("server code = "+JSON.stringify(payload.user));
            jwt.sign(payload, process.env.SECRET, {
                //expiresIn: 3600

            }, (err, token) => {
                if (err) throw err
                res.send({ token,user: payload.user })
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
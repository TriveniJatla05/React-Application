var router = require('express').Router();
//var auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//Guest Model
var Guest = require('../models/Guest');

// router.get('/', auth, async function (req, res) {
//     try {
//         const guests = await Guest.find({ user: req.user.id })
//         res.json(guests)
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('server error')
//     }
// })

router.post('/',
    [
        check('name', 'Please provide name').not().isEmpty(),
        check('phone', 'please provide phone number').not().isEmpty()
    ],
    async function (req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const { name, phone, dietary, isconfirmed } = req.body
        try {
            let guest = new Guest({
                //user: req.user.id,
                name,
                phone,
                dietary,
                isconfirmed
            })
            guest = await guest.save();
            res.json(guest)

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    })

//delete a guest
// router.delete('/:id', auth, async function (req, res) {
//     try {
//         let guest = await Guest.findById(req.params.id);
//         if (!guest) {
//             return res.status(404).json({ msg: 'Guest not found' });
//         }
//         await Guest.findByIdAndRemove(req.params.id)
//         res.send('guest removed...!');
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send('Server Error')
//     }
// })

//update a guest
// router.put('/:id', auth, async function (req, res) {
//     const { name, phone, dietary, isconfirmed } = req.body
//     const updatedGuest = { name, phone, dietary, isconfirmed }
//     try {
//         let guest = await Guest.findById(req.params.id);
//         if (!guest) {
//             return res.status(404).json({ msg: 'Guest not found' });
//         }
//         guest = await Guest.findByIdAndUpdate(req.params.id, { $set: updatedGuest }, { new: true })
//         res.send(guest)
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send('Server Error')
//     }
// })
module.exports = router
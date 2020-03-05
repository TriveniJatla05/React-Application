var express = require('express');
var app = express();

var connectDB = require('./config/db');
connectDB();

app.use(express.json({ extended: true }))
app.use('/register', require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/guests',require('./routes/guests'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on ${PORT} port number`));


// app.use('/test',require('./routes/register'));
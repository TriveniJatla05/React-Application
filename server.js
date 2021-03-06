var express = require('express');
var path = require('path');
var app = express();

var connectDB = require('./config/db');
connectDB();

app.use(express.json({ extended: true }))
app.use('/register', require('./routes/register'));
app.use('/auth',require('./routes/auth'));
app.use('/review',require('./routes/review'));

//step: 3
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('react-movie-app/build'));
    
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,'react-movie-app','build','index.html'));
    });
}

const PORT = process.env.PORT || 5000; //step: 1

app.listen(PORT, () => console.log(`server running on ${PORT} port number`));


// app.use('/test',require('./routes/register'));
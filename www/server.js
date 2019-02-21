var express        = require('express')
var path           = require('path')
var fs             = require('fs')
var mongoose       = require('mongoose')
var bodyParser     = require('body-parser');

var posts          = require('./routes/posts');
var app            = express(); 

mongoose.connect('mongodb://localhost:27017/timeline', { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(express.static(path.resolve(__dirname, '../dist'))); 


app.use('/posts', posts)   
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html')); 
});
 
app.listen(4000, () => console.log("server is running successfully on port 4000")); 


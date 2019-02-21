
var express = require('express');
var fs = require('fs');
var multer = require("multer");
var post = require('../models/post');

var router = express.Router()
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../dist/Images/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var upload = multer({
    storage
})
 
router.post('/upload', upload.single('image'), (req, res) => {
    if (req.file)
        res.json({
            imageUrl: `/Images/uploads/${req.file.filename}`
        });
    else
        res.status("409").json("No Files to Upload.");
});

router.get('/find/:page/:size', (req, res, next) => {
    let { page,size } = req.params
    page = parseInt(page,10)
    size = parseInt(size,10)
    let query = {}
    query.skip = size * (page - 1)
    query.limit = size
    post.find({},{}, query, (err, posts) => {
        if (err) return next(err)
        res.json(posts)
    })
})

const guidGenerator = () => {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "" + S4() + "" + S4() + "" + S4());
}
router.post("/add", (req, res, next) => {
    req.body._id = guidGenerator()
    post.create(req.body, (err, Post) => {
        if (err) return next(err)
        res.json(Post)
    })
})



router.post("/delete", (req, res, next) => {
    let { _id } = req.body
    product.findOneAndDelete({ _id }, (err, data) => {
        if (err) return next(err)
        fs.unlink("../../femus/dist" + data.img, (err) => {
            if (err) return next(err)
            res.json(data)
        })
    })
})

router.post("/remove",(req,res,next)=>{
    let Path = "../dist" + req.body.img
    fs.unlink(Path,(err)=>{
        if(err) return next(err)
        res.json({deleted:true})
    })
})
router.post("/sendLike",(req,res,next)=>{
    let { _id } = req.body
    post.findOneAndUpdate({_id},{ $inc: { likes: 1 }},(err,data)=>{
        if(err) return next(err)
        res.json(data)
    })
})




module.exports = router

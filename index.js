//Variables-----------------------------------------------------------Variables

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config");
const {
    getImages,
    addImage,
    getImageById,
    addComment,
    getCommentsById
} = require("./db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

const s3 = require("./s3");

//Middleware---------------------------------------------------------Middleware

app.use(express.static("./public"));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

//Routes-----------------------------------------------------------------Routes

app.get("/images", function(req, res) {
    // console.log("inside GET images", config)
    getImages().then(results => {
        results.rows.forEach(function(image) {
            image.image = config.s3Url + image.image;
        });
        res.json({ images: results.rows });
    });
});

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    console.log("inside POST /upload");
    if (req.file) {
        addImage(
            req.file.filename,
            req.body.username,
            req.body.title,
            req.body.description
        ).then(results => {
            results.rows[0].image = config.s3Url + results.rows[0].image;
            res.json({ images: results.rows[0] });
            console.log("upload was successful");
        });
    } else {
        console.log("upload did not work");
        res.json({
            success: false
        });
    }
});

app.post("/comment", function(req, res) {
    console.log("inside POST comment route");
    console.log(req.body);

    addComment(req.body.comment, req.body.username, req.body.image_id).then(
        results => {
            res.json({ comments: results.rows[0] });
        }
    );
});

app.get("/popup/:id", function(req, res) {
    var id = req.params.id;
    // console.log(id);
    if (isNaN(id)) {
        res.sendStatus(500);
        return;
    } else {
        Promise.all([getImageById(id), getCommentsById(id)]).then(
            ([imageResults, commentResults]) => {
                imageResults.rows[0].image =
                    config.s3Url + imageResults.rows[0].image;
                res.json({
                    image: imageResults.rows[0],
                    comments: commentResults.rows
                });
            }
        );
    }
});

app.listen(8080, () => {
    console.log("I'm listening.");
});

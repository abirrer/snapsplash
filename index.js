//Variables-----------------------------------------------------------Variables
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require('./config');
const { getImages } = require("./db");

//Middleware---------------------------------------------------------Middleware
app.use(express.static("./public"));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

//Routes-----------------------------------------------------------------Routes

app.get('/images', function(req, res) {
    console.log("inside GET images", config)
    getImages().then(results => {
        // results.rows;
        results.rows.forEach(function(image) {
            image.image = config.s3Url + image.image
        })
        res.json({ images: results.rows });
    });

})

app.listen(8080, () => {
    console.log("I'm listening.")
})

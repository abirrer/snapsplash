var spicedPg = require("spiced-pg");

if (!process.env.DATABASE_URL) {
    var { dbUser, dbPass } = require("./secrets");
}

var db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUser}:${dbPass}@localhost:5432/imageboard`
);

function getImages() {
    return db.query(`SELECT * FROM images ORDER BY created_at DESC`)
}

function addImage(file, username, title, description) {
    return db.query(`INSERT INTO images (image, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *`,
        [file, username, title, description]
    );
}

exports.getImages = getImages;
exports.addImage = addImage;

var spicedPg = require("spiced-pg");

if (!process.env.DATABASE_URL) {
    var { dbUser, dbPass } = require("./secrets");
}

var db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUser}:${dbPass}@localhost:5432/imageboard`
);

function getImages() {
    return db.query(`SELECT * FROM images ORDER BY created_at DESC LIMIT 12`);
}

function addImage(file, username, title, description) {
    return db.query(
        `INSERT INTO images (image, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *`,
        [file, username, title, description]
    );
}

function getImageById(id) {
    return db.query(`SELECT * FROM images WHERE id = $1`, [id]);
}

function addComment(comment, username, id) {
    return db.query(
        `INSERT INTO comments (comment, username, image_id) VALUES ($1, $2, $3) RETURNING *`,
        [comment, username, id]
    );
}

function getCommentsById(id) {
    return db.query(
        `SELECT * FROM comments WHERE image_id = $1 ORDER BY created_at DESC`,
        [id]
    );
}

exports.getImages = getImages;
exports.addImage = addImage;
exports.getImageById = getImageById;
exports.addComment = addComment;
exports.getCommentsById = getCommentsById;

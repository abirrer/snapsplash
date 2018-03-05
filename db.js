var spicedPg = require("spiced-pg");

if (!process.env.DATABASE_URL) {
    var { dbUser, dbPass } = require("./secrets");
}

console.log(require("./secrets"));

var db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUser}:${dbPass}@localhost:5432/imageboard`
);

function getImages() {
    return db.query(`SELECT * FROM images ORDER BY created_at DESC`)
}

exports.getImages = getImages;

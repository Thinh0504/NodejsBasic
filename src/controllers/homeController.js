import pool from "../configs/connectDB.js";
import multer from "multer";

let getHomePage = async(req, res) => {
    const [row, fields] = await pool.execute("Select * from users");
    return res.render("index.ejs", { dataUser: row });
};

let getDetailPage = async(req, res) => {
    let id = req.params.userId;
    let user = await pool.execute("select * from users where id = ?", [id]);
    return res.send(JSON.stringify(user[0]));
};

let createNewUser = async(req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute(
        "insert into users(firstName, lastName, email, address) values(?,?,?,?)", [firstName, lastName, email, address]
    );
    return res.redirect("/");
};

let deleteUser = async(req, res) => {
    let userId = req.body.userId;
    await pool.execute("delete from users where id = ?", [userId]);
    return res.redirect("/");
};

let getEditPage = async(req, res) => {
    let id = req.params.userId;
    let [user] = await pool.execute(`select * from users where id = ?`, [id]);
    return res.render("update.ejs", { dataUser: user[0] });
};

let postUpdateUser = async(req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute(
        `Update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`, [firstName, lastName, email, address, id]
    );
    return res.redirect("/");
};

let getUploadFilePage = async(req, res) => {
    return res.render("upload.ejs");
};

//
let handleUploadFile = async(req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    } else if (!req.file) {
        return res.send("Please select an image to upload");
    }
    res.send(
        `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
};

let handleUploadMultipleFile = async(req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    } else if (!req.files) {
        return res.send("Please select an image to upload");
    }
    let result = "You have upload there files: <hr />";
    const files = req.files;
    let index, len;

    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src ="/image/${files[index].filename}" width="300" style ="margin-right:20px"; /><a href="/upload">Upload another image</a>`;
    }
    res.send(result);
};

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMultipleFile,
};
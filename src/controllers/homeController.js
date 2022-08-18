import pool from "../configs/connectDB.js";

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

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser,
};
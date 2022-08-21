import pool from "../configs/connectDB.js";

let getAllUsers = async(req, res) => {
    //console.log(">>>", typeof getAllUsers);
    const [row, fields] = await pool.execute("Select * from users");
    return res.status(200).json({
        message: "ok",
        data: row,
    });
};

var createUser = async(req, res) => {
    let { firstName, lastName, email, address } = req.body;

    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: "missing require params",
        });
    }
    await pool.execute(
        "insert into users(firstName, lastName, email, address) values(?,?,?,?)", [firstName, lastName, email, address]
    );
    return res.status(200).json({
        message: "ok",
    });
};

let updateUser = async(req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: "missing require params",
        });
    }
    await pool.execute(
        `Update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`, [firstName, lastName, email, address, id]
    );
    return res.status(200).json({
        message: "ok",
    });
};

let deleteUser = async(req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: "missing require params",
        });
    }
    await pool.execute("delete from users where id = ?", [userId]);
    return res.status(200).json({
        message: "ok",
    });
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
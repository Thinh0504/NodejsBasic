import express from "express";
import APIControllers from "../controllers/APIControllers.js";

let router = express.Router();

const initAPIRoute = (app) => {
    router.get("/users", APIControllers.getAllUsers);
    router.post("/create-user", APIControllers.createUser);
    router.put("/update-user", APIControllers.updateUser);
    router.delete("/delete-user/:id", APIControllers.deleteUser);
    return app.use("/api/v1", router);
};

export default initAPIRoute;
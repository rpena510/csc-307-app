import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;


    
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    userService.findUserById(id)
        .then((user) => {
            res.send(user);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userService.addUser(userToAdd)
        .then((user) => {
            res.status(201).send(user);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    userService.deleteUserById(id)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            console.log(error);
            res.status(404).send("resource not found.");
        });
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userService.getUsers(name, job)
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((error) => {
            console.log(error);
            res.status(404).send("resource not found.");
        });
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
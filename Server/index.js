const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Failed to connect to MongoDB", err));

app.get("/get", (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { done } = req.body; // Use dynamic done value
    TodoModel.findByIdAndUpdate({ _id: id }, { done: done })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.delete("/delete/:id", (req, res) => {  // Fixed URL parameter
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post("/add", (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task  // Fixed the field name
    })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server is running");
});

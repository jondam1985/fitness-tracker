const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//Rendering HTML

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "stats.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "exercise.html"));
});

//API calls

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(resWorkout => {
        res.json(resWorkout);
    })
    .catch(error => {
        res.json(error);
    });
});

app.put("/api/workouts/:id", (req, res) => {
    let _id = req.params.id;
    let type = req.body.type;
    let name = req.body.name;
    let distance = req.body.distance;
    let duration = req.body.duration;
    db.Workout.insertMany({_id: _id, exercises: [{type: type, name: name, distance: distance, duration: duration}]})
    .then(resWorkout => {
        res.json(resWorkout);
    })
    .catch(error => {
        res.json(error);
    });
});

app.listen(PORT, () => {
console.log(`app listening on port: ${PORT}`);
});
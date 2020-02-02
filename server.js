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
    db.Workout.find({}).sort({ day: -1 }).limit(1)
        .then(resWorkout => {
            res.json(resWorkout);
        })
        .catch(error => {
            res.json(error);
        });
});

app.put("/api/workouts/", (req, res) => {
    let id = req.params.id;
    let body = req.body;
    db.Workout.update({ day: new Date().setDate(new Date().getDate()) },
        {
            $push: {
                exercises: [{
                    "type": body.type,
                    "name": body.name,
                    "duration": body.duration,
                    "weight": body.weight,
                    "reps": body.reps,
                    "sets": body.sets
                }]
            }
        })
        .then(resWorkout => {
            res.json(resWorkout);
        })
        .catch(error => {
            res.json(error);
        });
});

db.Workout();

app.listen(PORT, () => {
    console.log(`app listening on port: ${PORT}`);
});
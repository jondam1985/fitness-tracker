//Required dependencies

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

//Requests to show last exercise

app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).sort({ day: -1 }).limit(1)
        .then(resWorkout => {
            res.json(resWorkout);
        })
        .catch(error => {
            res.json(error);
        });
});

app.post("/api/workouts", (req, res) => {
    db.Workout.find({}).sort({ day: -1 }).limit(1)
        .then(resWorkout => {
            res.json(resWorkout);
        })
        .catch(error => {
            res.json(error);
        });
});

//Request to create new exercise entries

app.put("/api/workouts/undefined", (req, res) => {
    let id = req.params.id;
    let body = req.body;
    db.Workout.create({
        _id: id, day: new Date().setDate(new Date().getDate()),

        exercises: [{
            "type": body.type,
            "name": body.name,
            "distance": body.distance,
            "duration": body.duration,
            "weight": body.weight,
            "reps": body.reps,
            "sets": body.sets
        }]

    })
        .then(resWorkout => {
            res.json(resWorkout);
        })
        .catch(error => {
            res.json(error);
        });
});

//Call to create stats

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(error => {
            res.json(error);
        });
});

//Call to update existing exercises

app.put("/api/workouts/:id", (req, res) => {

    let id = req.params.id;
    let body = req.body;
    db.Workout.updateOne({ _id: id }, {
        $push: {
            exercises: [
                {
                    "type": body.type,
                    "name": body.name,
                    "duration": body.duration,
                    "distance": body.distance,
                    "weight": body.weight,
                    "reps": body.reps,
                    "sets": body.sets
                }
            ]
        }
    }).then(update => {
        res.json(update);
    })
        .catch(error => {
            res.json(error);
        });

});


//Connection to DB established

db.Workout();


//Launches server

app.listen(PORT, () => {
    console.log(`app listening on port: ${PORT}`);
});
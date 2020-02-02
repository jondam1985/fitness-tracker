# fitness-tracker

# Description

This is a full stack web app that tracks users workouts and saves them in a NoSQL database. This was developed for my Full Stack Web Development bootcamp.



![]( https://content.screencast.com/users/nrt.damian/folders/Snagit/media/d13a5b3f-4c55-4361-8985-16bed706ecf2/02.02.2020-17.41.png )



# Content

1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Credits](#Credits)
4. [License](#License)



# Installation

[Clone this repository]( https://github.com/jondam1985/fitness-tracker ) and run `npm install`.

Make sure you haven `mongoDB` installed in your machine.

To add test documents to your `mongoDB` database run `npm run seed`.

To run locally execute `npm start` and access via `localhost:3000`.

To visit the production version go to https://are-we-not-fit.herokuapp.com.



# Usage

To add a new workout click on `New Workout` and enter all the required information. To add the workout keep adding more exercises click on `add exercise`. To add the workout and go back to the homepage click on `complete`.

To update an existing workout click on `Continue Workout`. To update the workout keep adding more exercises click on `add exercise`. To update the workout and go back to the homepage click on `complete`.

To see a chart of all your workouts click on `Fitness Tracker Dashboard` on the upper left corner.



# Credits

### Author

This web app was developed by [Damian Ruiz](https:www.github.com/jondam1985) as a project for the [UofT Full Stack Web Development bootcamp]( https://bootcamp.learn.utoronto.ca/ ).



### Dependencies

- Server developed using [Express]( https://www.npmjs.com/package/express )
- MongoDB schema created with [Mongoose]( https://www.npmjs.com/package/mongoose )
- HTTP requests logged with [Morgan]( https://www.npmjs.com/package/morgan )



# License

This project is licensed under the MIT standard license. [Click here for more details about the MIT License]( https://opensource.org/licenses/MIT ).
// import dependencies
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

const express = require("express"),
  morgan = require("morgan"),
  path = require("path"),
  bodyParser = require("body-parser");
const app = express();

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// log requests
app.use(morgan("common"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//GET requests
app.get("/", (req, res) => {
  res.send(
    "Hello! Welcome to myFlix where you will find information about the top 10 best suspense/thriller movies"
  );
});

//GET Documentation
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

//GET all movies
app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET movies by title
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET all genres
app.get("/genre", (req, res) => {
  Genres.find()
    .then((genre) => {
      res.status(200).json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).sned("Error: " + err);
    });
});

//GET a genre by Name
app.get("/genre/:Name", (req, res) => {
  Genres.findOne({ Name: req.params.Name })
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET director's info
app.get("/directors", (req, res) => {
  Directors.find()
    .then((director) => {
      res.status(200).json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
});

// GET director's info by name
app.get("/directors/:Name", (req, res) => {
  Directors.findOne({ Name: req.params.Name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//POST new users
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Born: req.body.Born,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error:" + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error:" + error);
    });
});

//Get all users
app.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Get a user by username
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Update a user's info by username
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Born: req.body.Born,
      },
    },
    { new: true }, //This line makes sure the document is returned)
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error" + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Add a movie to a user's list of favorites
app.post("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error:" + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//DELETE a movie from favorites
app.delete("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    {
      Username: req.params.Username,
    },
    {
      $pull: {
        FavoriteMovies: req.params.MovieID,
      },
    },
    {
      new: true, //This line makes sure that the updated document is returned
    },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//DELETE a user by their username
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("oops, something went wrong! Try again.");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});

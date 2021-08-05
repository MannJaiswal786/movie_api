// import dependencies
const express = require("express"),
  morgan = require("morgan");
const app = express();

// log requests
app.use(morgan("common"));
app.use(express.static("public"));

// JSON data object for movies
let movies = [
  {
    title: "Zodiac",
    director: "David Fincher",
    actors: ["Robert Downey JR", "Jake Gyllenhaal", "Mark Ruffalo"],
    releaseDate: 2007,
  },
  {
    title: "Seven",
    director: "David Fincher",
    actors: ["Bradd Pitt", "Morgan Freeman", "Gwyneth Paltrow"],
    releaseDate: 1995,
  },
  {
    title: "The Silence of the Lambs",
    director: "Jonathan Demme",
    actors: ["Jodie Foester", "Anthony Hopkins"],
    releaseDate: 1991,
  },
  {
    title: "Fargo",
    director: ["Ethan Coen", "Joel Coen"],
    actors: ["Frances McDormand", "William H. Macy", "Steve Buscemi"],
    releaseDate: 1996,
  },
  {
    title: "Inglorious Bastards",
    director: "Quentin Tarantino",
    actors: ["Brad Pitt", "Christoph Waltz", "Diane Kruger"],
    releaseDate: 2009,
  },
  {
    title: "Mystic River",
    director: "Clint Eastwood",
    actors: ["Sean Penn", "Tim Robbins", "Kevin Bacon"],
    releaseDate: 2003,
  },
  {
    title: "Taxi Driver",
    director: "Martin Scorsese",
    actors: ["Robert De Niro", "Jodie Foster"],
    releaseDate: 1976,
  },
  {
    title: "GoodFellas",
    director: "Martin Scorsese",
    actors: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    releaseDate: 1995,
  },
  {
    title: "Prisoners",
    director: "Denis Villenueve",
    actors: ["Hugh Jackman", "jake Gyllenhaal", "Paul Dano"],
    releaseDate: 2013,
  },
  {
    title: "Reservoir Dogs",
    director: "Quentin Tarantino",
    actors: ["Harvey Keitel", "Tim Roth", "Michael Madsen", "Steve Buscemi"],
    releaseDate: 1992,
  },
];

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

//GET movies list
app.get("/movies", (req, res) => {
  res.json(movies);
});

// GET movies by title
app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

// GET genre data
app.get("/movies/genre/:name", (req, res) => {
  res.send("Successful GET request returning data on movies by their genre");
});

//GET director's info
app.get("/movies/directors/:name", (req, res) => {
  res.send("Successful GET request returning director's info");
});

//POST new users
app.post("/users", (req, res) => {
  res.send("Successfully added a new user into the database");
});

//PUT existing user
app.put("/users/:username", (req, res) => {
  res.send("Successfully updated the username");
});

//POST a favorite movie
app.get("/users/:username/favorites/:movieID", (req, res) => {
  res.send("movie was successfully added to the favorites list");
});

//DELETE a movie from favorites
app.delete("/users/:username/favorites/:movieID", (req, res) => {
  res.send("Movie was deleted from the list");
});

//DELETE a user(deregister)
app.delete("/users/:username", (req, res) => {
  res.send("User successfully deregistered");
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

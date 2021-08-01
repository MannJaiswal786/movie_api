// import dependencies
const express = require("express"),
  morgan = require("morgan");
const app = express();

// log requests
app.use(morgan("common"));
app.use(express.static("public"));

// JSON data object for movies
let topSuspenseMovies = [
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

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topSuspenseMovies);
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

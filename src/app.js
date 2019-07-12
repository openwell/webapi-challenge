const express = require("express");
const helmet = require("helmet");

const actionsRoute = require('./actions/actionsRoutes')
const projectsRoute = require('./products/projectsRoute')

const app = express();
app.use(express.json());
app.use(logger, helmet());


app.use('/api/actions', actionsRoute)
app.use('/api/projects', projectsRoute)


app.get("/", (req, res) => {
  console.log('object');
  res.send(`<h2>Let's write some middleware!</h2>`);
});

app.all("*", (req, res) => {
  res.status(404).json("Sorry No Such Location");
});
//custom middleware

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

module.exports = app;

const express = require('express');
const network = require("./network");
const fs = require('fs');
var cors = require('cors')

const app = express();
app.use(cors())

app.set('view engine', 'ejs');

app.get("/html/:term", async (req, res) => {
  const title = req.params.term;
  let data = await network.get(title);
  data = JSON.parse(data);
  if (data.businesses.length === 0) {
    res.send("💩");
    return;
  }
  res.render('index', {results: data.businesses, title});
});


app.get("/api/:term", async (req, res) => {
  const title = req.params.term;
  let data = await network.get(title);
  data = JSON.parse(data);
  res.send(data)
});


app.listen(process.env.PORT || 8080);
const express = require('express');
const request = require('request');
const fs = require('fs');

const app = express();

function processData(data, title) {
  delete data.href;
  delete data.version;
  data.title = title;
  return data;
}

function phpData(data) {

  let phpResults = data.results.map(result => {
    let string = '[\n';
    for(const key in result) {
      const value = result[key];
      string += `"${key}" => "${value}",
      `;
    }
    string += ']\n';
    return string;
  });
  
  return `<pre>$data = [
    "title" => "${data.title}",
    "subTitle" => "Recipes 😎",
    "results" => [` +
    phpResults.reduce((previous, current) => previous+","+current) +
    `]];</pre>`;
}

app.get("/:recipe", (req, res) => {
  request(`http://www.recipepuppy.com/api/?q=${req.params.recipe}`, function (error, response, body) {
    let data = JSON.parse(body);
    data = processData(data, req.params.recipe);
    data = phpData(data);
    console.log(data);
    res.format({
      'text/html': function () {
        res.send(data);
      }
    });
    
  });
  // res.send("😎");
});

app.listen(process.env.PORT || 8080);
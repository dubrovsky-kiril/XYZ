var express = require("express");
var path = require("path")
var client = require("./client");

var app = express();
var PORT = 3000;

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/search', async function (req, res) {
  const queriedProductId = parseInt(req.query.productId, 10);

  client.spreadsheets.values.get(
    {
      spreadsheetId: "19ETux4PsK9ro2e2DIJkJFjjdS_ewws1Oje4FrNgBqzs",
      range: "A:Z"
    },
    (err, response) => {
      if (err) return console.log("The API returned an error: " + err);

      if (response.data.values.length) {
        const flattenIds = response.data.values.reduce((acc, curr) => [...acc, ...curr], []);
        const parsedIds = flattenIds.map(id => parseInt(id.replace(/ /g, ""), 10))

        const doesExist = parsedIds.some(parsedId => parsedId === queriedProductId)

        res.render('index', { id: queriedProductId, doesExist });
      } else {
        console.log("No data found.");
      }
    }
  )
})

app.listen(3000, function () {
  console.log("Server is running on port " + PORT);
});
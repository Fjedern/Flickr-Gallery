require("dotenv").config();
const express = require("express");
const Flickr = require("flickr-sdk");
let cors = require("cors");

var flickr = new Flickr(process.env.FLICKR_API_KEY);

const app = express();
const port = 5000;

app.use(cors());

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello world!");
});

function SearchFlickr(search, page) {
  var arrayResults = [];
  var pics = flickr.photos
    .search({
      tags: search,
      page: page
    })
    .then(function (result) {
      for (var i = 0; i < result.body.photos.photo.length; i++) {
        var pic = result.body.photos.photo[i];

        arrayResults[i] = {
          id: pic.id,
          server: pic.server,
          secret: pic.secret,
          farm: pic.farm,
          title: pic.title,
        };
      }
      return arrayResults;
    })
    .catch(function (error) {
      console.error("error", error);
    });
  return pics;
}

app.get("/picBySearch/:search/:page", (req, res) => {
  const search = req.params.search;
  const page = req.params.page;
  var pics = SearchFlickr(search, page);
  pics.then(function (result) {
    res.json(result);
  });
});
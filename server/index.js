const ThreadedUserManager = require("./threadedUserManager");
const jsonParser = require("body-parser").json();
const express = require("express");
const app = express()

app.post("/api/tweetThread", jsonParser, function(req, res) {
  let threadedUsers = new ThreadedUserManager(req.body.url);
  threadedUsers.fetch()
    .then(manager => {
      res.send({users: manager.users});
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(JSON.stringify(err))
    });
});

app.listen(3000);

var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var CONTACTS_FILE = path.join(__dirname, "contacts.json");

app.set("port", process.env.PORT || 4000);

app.use("/", express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/contacts", function(req, res) {
  fs.readFile(CONTACTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.description = "Internal Error";
      res.send(err);
    } else {
      res.setHeader("Cache-Control", "no-cache");
      res.json(JSON.parse(data));
    }
  });
});

app.post("/api/contacts", function(req, res) {
  fs.readFile(CONTACTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.description = "Internal error";
      res.send(err);
    } else {
      var contacts = JSON.parse(data);
      var newContact = {
        id: Date.now(),
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email
      };
      contacts.push(newContact);
      fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 4), function(
        err
      ) {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.description = "Internal error";
          res.send(err);
        } else {
          res.setHeader("Cache-Control", "no-cache");
          res.json(newContact);
        }
      });
    }
  });
});

app.delete("/api/contacts/:id", function(req, res) {
  var id = req.params.id;
  fs.readFile(CONTACTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.description = "Internal Error";
      res.send(err);
    } else {
      res.setHeader("Cache-Control", "no-cache");
      var contacts = JSON.parse(data);
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id == id) {
          contacts.splice(i, 1);
        }
      }
      fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 4), function(
        err
      ) {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.description = "Internal error";
          res.send(err);
        } else {
          res.setHeader("Cache-Control", "no-cache");
          res.json(contacts);
        }
      });
    }
  });
});

app.listen(app.get("port"), function() {
  console.log("Server started: http://localhost:" + app.get("port") + "/");
});

const express = require('express');
const moment = require("moment");
const app = express();

module.exports = app;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post("/calculate-age", (req, res) => {
    const birthYear = parseInt(req.body.birthYear);
    if (isNaN(birthYear)) {
      res.send("Please enter a valid year.");
      return;
    }
  
    const now = moment();
    const isLeapYear = moment(`${birthYear}-02-29`).isValid();
    let age = now.diff(`${birthYear}-03-01`, "years");
    if (isLeapYear) {
      age++;
    }
  
    res.send(`If you were born on February 29th, ${birthYear}, you would be ${age} years old on February 29th ${now.year()}.`);
  });
  
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000.");
  });
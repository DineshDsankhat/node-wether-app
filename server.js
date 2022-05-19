const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

const forcast = require(path.join(__dirname, "/api/forecast"));
const geodata = require(path.join(__dirname, "/api/geocode"));

// Paths
const staticPath = path.join(__dirname, "public");
const viewPath = path.join(__dirname, "./template/views");
const partialPath = path.join(__dirname, "./template/partials");
app.use(express.static(staticPath));

//handlares engine
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);


// homepage
app.get("/", (req, res) => {
  res.render("index", { home: "active" });
});

//about
app.get("/about", (req, res) => {
  res.render("about");
});

//help
app.get("/help", (req, res) => {
  res.render("help");
});

//weather
app.get("/weather", (req, res) => {
  let city=req.query.city;
  if(!city){
    return res.send({eror:"no blank is valid provide a ?city=YOUR_CITY"})
  }
  geodata(city, (error, {latitude,longitude,location}={}) => {
    if (error) {
      return res.send(error);
    }
    forcast(latitude,longitude, (error, responce) => {
      if (error) {
        return res.send(error);
      }
      res.send(responce
        );
    });
  });
});

//404
app.get("*", (req, res) => {
  res.render("404", {
    erorrname: " Page Not Found",
  });
});


app.listen(3000, () => {
  console.log("3000");
});

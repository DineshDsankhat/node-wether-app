const form = document.getElementById("searchform");
let oldcity;
let city;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  city = document.getElementById("city").value;
  if (city != "" && city.length > 2 && city != oldcity) {
    oldcity = city;
    fetch(`http://localhost:3000/weather?city=${city}`)
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {  
    if (city == oldcity) {
      console.log("Data already loaded");
    } else {
      console.log("plz enter valid city");
    }
  }
});

const request = require("postman-request");
let url = "http://api.weatherstack.com/current";
const YOUR_ACCESS_KEY = "b935d4d7140a7bc8a8f0b6874915d8ba";


const forcast = (leti,long,callback) => {
   url = `${url}?access_key=${YOUR_ACCESS_KEY}&query=${leti},${long}&uits=f`;
  
   request({ url }, (error, {body}) => {
    if (error) {
      callback(error,undefined);
    }else{      
      body=JSON.parse(body);
    callback(undefined, body);
    }  
});
};

module.exports = forcast;

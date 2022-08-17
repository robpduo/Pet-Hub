const router = require('express').Router();
// var request = require('request');


// router.get('/', function(req, res, next) {
//   request({
//     uri: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBC53rjSi9TjEJ7Re0Sy0i6tpwwDHF14qo&libraries=places&callback=initMap',
//     // qs: {
//     //   api_key: '123456',
//     //   query: 'World of Warcraft: Legion'
//     // },
//     function(error, response, body) {
//       if (!error && response.statusCode === 200) {
//         console.log(body)
//       }
//     }
//   });
// });


router.get("/", (req, res) => {
    // request.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyBC53rjSi9TjEJ7Re0Sy0i6tpwwDHF14qo&libraries=places&callback=initMap", (err, response, body) => {
    //     if (err) {
    //         return next(err);
    //     }
        res.render("places");
        // {data: JSON.parse()});
    
});

module.exports = router; 


const express = require('express');
const router = express.Router();

// Do work here

// Router works by specifying a router destination endpoint: '/' in this case
// then, it runs a callback function when someone visits that route/URL
/* This callback function gives you three things:
    1. req = request, an object full of information that's coming in
    2. res = response, an object full of methods for sending data back to the user
    3. next = reviewed later in 'middleware' file (not handling here but passing on)
*/
router.get('/', (req, res) => {

  const ogi = {
    name: 'Ogi',
    age: 100,
    cool: true
  };

  // res.json(ogi); // returns above object

  // with req.query we can access any of the parameters which make up the request
  // res.send(req.query.name);   // name parameter on query object
  // res.send(req.query.age);    // age parameter

  // res.send(req.query);    // entire query object

  // don't use the res object more than once to send a response, will give error
  // res.send('Hey! It works!');

  // res.render takes two things: template to render, and local variable (info)
  res.render('hello', {
    name: 'ogi',
    cat: req.query.cat
  });

});

// create a new route where we put a variable inside the endpoint using ':' colon syntax
router.get('/reverse/:name', (req, res) => {
  
  // reverse incoming string characters, return result
  let reverse = [ ...req.params.name ];
  reverse = reverse.reverse().join('');
  res.send(reverse);

  res.send(req.params.name);    // this URL variable can then be accessed via req.params

})

module.exports = router;

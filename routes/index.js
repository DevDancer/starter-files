const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Router works by specifying a router destination endpoint: '/' in this case
// then, it runs a callback function when someone visits that route/URL
/* This callback function gives you three things:
    1. req = request, an object full of information that's coming in
    2. res = response, an object full of methods for sending data back to the user
    3. next = reviewed later in 'middleware' file (not handling here but passing on)
*/
router.get('/', storeController.homePage);

router.get('/add', storeController.addStore);
router.post('/add', storeController.createStore);

// create a new route where we put a variable inside the endpoint using ':' colon syntax
router.get('/reverse/:name', (req, res) => {
  
  // reverse incoming string characters, return result
  let reverse = [ ...req.params.name ];
  reverse = reverse.reverse().join('');
  res.send(reverse);

  res.send(req.params.name);    // this URL variable can then be accessed via req.params

})

module.exports = router;

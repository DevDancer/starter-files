exports.homePage = (req, res) => {

    console.log(req.name);
    res.render('index');

};

exports.addStore = (req, res) => {
    
    res.render('editStore', { title: '💩 Add Store' });

};

exports.createStore = (req, res) => {

    res.json(req.body);

}

// ------POSTERITY------

// original content from index.js stored here for posterity
exports.originalHomePage = (req, res) => {
    
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
    cat: req.query.cat,
    title: 'I love food'
  });

};
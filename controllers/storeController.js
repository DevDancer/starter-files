const { create } = require('connect-mongo');
const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {

    res.render('index');

};

exports.addStore = (req, res) => {
    
    res.render('editStore', { title: '💩 Add Store' });

};

exports.createStore = async (req, res) => {

    const store = await (new Store(req.body)).save(); // will save to mongoDB and either: return store if successful, OR return the error that prevented it
    req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
    res.redirect(`/store/${store.slug}`);      // redirects user to endpoint associated with the store they have just made

};

exports.getStores = async (req, res) => {

    // first, query DB for list of all stores
    const stores = await Store.find();
    res.render('stores', { title: 'Stores', stores });

};

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
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

exports.editStore = async (req, res) => {

    // Find the store given the id
    const store = await Store.findOne({ _id: req.params.id });
    // TODO: Confirm they are the owner of the store

    // Render out the edit form for updating the store
    res.render('editStore', { title: `Edit ${store.name}`, store });

};

exports.updateStore = async (req, res) => {

    // set location data to type: point
    req.body.location.type = 'Point';
    
    // find and upate the store
    const store = await Store.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { 
            new: true,      // return the new store instead of the old one
            runValidators: true     // forces validators to check data
        }
    ).exec();   // forces the query to run
    // redirect them to the store and tell them it worked
    req.flash('success', `Successfully Updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store ➡️</a>`);
    res.redirect(`/stores/${store._id}/edit`);
    
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
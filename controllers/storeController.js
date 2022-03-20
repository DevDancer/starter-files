const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    strorage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);   // when passing two values to 'next', this implies the current function succeeded, and the second value is what needs to be passed along
        } else {
            next({ message: 'That filetype isn\'t allowed!' }, false);
        }
    }
};

exports.homePage = (req, res) => {
    res.render('index');
};

exports.addStore = (req, res) => {
    res.render('editStore', { title: '💩 Add Store' });
};

// store photo to server memory (temporary)
exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
    // check if there is no new file to resize
    if (!req.file) return next();     // skip to next middleware
    const extension = req.file.mimetype.split('/')[1];  // grab 'jpeg' from mimetype
    req.body.photo = `${uuid.v4()}.${extension}`;
    // now, resize
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    // once we've written the photo to filesystem, keep going
    next();
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

exports.getStoreBySlug = async (req, res, next) => {
    const store = await Store.findOne({ slug: req.params.slug });
    if (!store) return next(); // if nothing is found, go to next middleware
    res.render('store', { store, title: store.name });
    res.json(store);
};

exports.getStoresByTag = async (req, res) => {
    const tag = req.params.tag;
    const tagQuery = tag || { $exists: true };
    const tagsPromise = Store.getTagsList();
    const storesPromise = Store.find({ tags:  tagQuery });
    // await for both Promises simultaneously (faster than awaiting one by one)
    const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

    res.render('tag', { tags, title: 'Tags', tag, stores });
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
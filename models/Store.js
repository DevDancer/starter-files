const mongoose = require('mongoose');
mongoose.Promise = global.Promise;      // tell mongoose to wait for data from database via built-in ES6 promise
const slug = require('slugs');      // makes URL friendly names for our slugs

// make schema
const storeSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name!'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            required: 'You must supply coordinates!'
        }],
        address: {
            type: String,
            required: 'You must supply an address!'
        }
    }

});

storeSchema.pre('save', function(next) {
    
    if(!this.isModified('name')) {

        next(); // move to next middleware
        return; // stop remainder of code from running

    } else {
        
        this.slug = slug(this.name);
        next();

    }

    // TODO: Make more resilient so all slugs are unique

})

module.exports = mongoose.model('Store', storeSchema);
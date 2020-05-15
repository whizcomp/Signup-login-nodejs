const mongoose = require('mongoose');
module.exports = function () {
    mongoose.connect('mongodb://localhost/hms', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('connected to mongodb'))
        .catch(() => console.log('failed to connected'))
    mongoose.set('useCreateIndex', true)
}
const config = require('config')
module.exports = function () {
    if (!config.get('privateKey')) {
        console.error('FATAL ERROR CONFIG NOT SET');
        process.exit(1);
    }
}
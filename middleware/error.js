module.exports = function (err, req, res, next) {
    res.status(500).send('server error');
}
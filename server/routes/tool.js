const Express = require('express');
const Router = Express.Router();

/* GET users listing. */
Router.get('/tool', (req, res, next) => {

    res.send('respond with a resource');
});

module.exports = Router;

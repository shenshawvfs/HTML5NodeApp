const Express = require('express');
const Router = Express.Router();

/* POST users listing. */
Router.post('/api/login', (req, res, next) => {

    res.send('respond with a resource');
});

module.exports = Router;

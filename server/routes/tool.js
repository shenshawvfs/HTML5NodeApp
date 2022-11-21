import Express from 'express';
const Router = Express.Router();

/* GET users listing. */
Router.get('/tool', (req, res, next) => {

    res.send('respond with a resource');
});

export default Router;

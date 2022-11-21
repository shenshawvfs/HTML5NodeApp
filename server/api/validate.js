import Express from 'express';
const Router = Express.Router();

/* GET home page. */
Router.get('/', (req, res, next) => {

    res.render('index', { title: 'Bunnies N Unicorns' });
});

export default Router;
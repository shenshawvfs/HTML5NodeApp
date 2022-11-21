import Express from 'express';
const Router = Express.Router();

/* GET home page. */
Router.post('/api/logout', (req, res, next) => {

    res.render('index', { title: 'Bunnies N Unicorns' });
});

export default Router;

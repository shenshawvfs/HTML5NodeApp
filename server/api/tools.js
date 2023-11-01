import Express from 'express'
const Router = Express.Router();

/* GET users listing. */
Router.get('/save', (req, res, next) => {

    res.send('respond with a resource')
});

export default Router
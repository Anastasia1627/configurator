const authRoute = require('./auth_route');
const userRoute = require('./user_route');
const listRoute = require('./list_route');
const todoRoute = require('./todo_route');


module.exports = function (app, db) {
    authRoute(app, db);
    userRoute(app, db);
    listRoute(app, db);
    todoRoute(app, db);
};

const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;
const ToDo = require('../models/todo');


module.exports = (app, database) => {
    const todos_collection = database.collection('todos');
    const lists_collection = database.collection('lists');

    app.use(cors());

    app.post('/api/lists/:listID/todos', (req, res) => {
        const id = req.params.listID;
        const filter = { _id: new ObjectID(id) };

        lists_collection.findOne(filter, (err, list) => {
            if (list){
                todos_collection.findOne({ name: req.headers.name }, (err, todo) => {
                    if (!todo) {
                        todo = new ToDo({
                            name: req.headers.name,
                            listID: id,
                            completed: req.headers.completed
                        });

                        todos_collection.insertOne(todo, (err) => {
                            if (err) {
                                res.json({ message: 'Creation todo failed. Try again.' });
                            } else {
                                res.status(200).json({ todo: todo });
                            }
                        });
                    }
                });
            }
        });
    });

    app.get('/api/lists/:listID/todos', (req, res) => {
        const id = req.params.listID;
        const filter = { listID: new ObjectID(id) };

        ToDo.find(filter, (err, todo) => {
            const todos = [];
            todo.forEach((todo) => {
                todos.push({
                    listID: todo.listID,
                    name: todo.name,
                    id: todo._id,
                    completed: todo.completed
                });
            });
            res.status(200).json({ todos: todos });
        });
    });

    app.get('/api/lists/:listID/todos/:id', (req, res) => {
        const id = req.params.listID;
        const filter = { _id: new ObjectID(id) };

        lists_collection.findOne(filter, (err, list) => {
            const id = req.params.id;
            const filter = { _id: new ObjectID(id) };

            todos_collection.findOne(filter, (err, todo) => {
                if (err) {
                    res.json({ error: 'An error has occurred.' });
                } else {
                    res.status(200).json({ todo });
                }
            });
        });
    });

    app.put('/api/lists/:listID/todos/:id', (req, res) => {
        const id = req.params.listID;
        const filter = { _id: new ObjectID(id) };

        lists_collection.findOne(filter, (err, list) => {
            const id = req.params.id;
            const filter = { _id: new ObjectID(id) };

            const todo = {
                $set: { name: req.body.name },
            };

            todos_collection.updateOne(filter, todo, (err, result) => {
                if (err) {
                    res.json({ error: 'An error has occurred.' });
                } else {
                    res.status(200).json({ name: req.body.name });
                }
            });
        });
    });

    app.delete('/api/lists/:listID/todos/:id', (req, res) => {
        const id = req.params.listID;
        const filter = { _id: new ObjectID(id) };

        lists_collection.findOne(filter, (err, list) => {
            const id = req.params.id;
            const filter = { _id: new ObjectID(id) };

            todos_collection.deleteOne(filter, (err, todo) => {
                if (err) {
                    res.json({ error: 'An error has occurred.' });
                } else {
                    res.status(200).json({ message: 'Todo was deleted successfully.' });
                }
            });
        });
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500).json(
            { message: err.message || 'Sorry something broke on the server!' },
        );
    });
};

const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;
const List = require('../models/list');


module.exports = (app, database) => {
    const collection = database.collection('lists');

    app.use(cors());

    app.post('/api/lists', (req, res) => {
        collection.findOne({ name: req.headers.name }, (err, list) => {
            if (!list) {
                list = new List({
                    name: req.headers.name,
                    usersID: [req.headers.id],
                });

                collection.insertOne(list, (err) => {
                    if (err) {
                        res.json({ message: 'Creation list failed. Try again.' });
                    } else {
                        res.status(200).json({
                            list: list.name,
                            id: list.id
                        });
                    }
                });
            }
        });
    });

    app.post('/api/lists/:id/share', (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectID(id) };

        collection.findOne(filter, (err, result) => {
            if (!result.usersID.includes(req.body.id) && req.body.id != null) {
                result.usersID.push(req.body.id);
                const list = {
                    $set: { usersID: result.usersID },
                };

                collection.updateOne(filter, list, (err, result) => {
                    if (err) {
                        res.json({ error: 'An error has occurred.' });
                    } else {
                        res.status(200).json({ list: list });
                    }
                });
            }
        });
    });

    app.get('/api/lists', (req, res) => {
        const id = req.headers.id;
        const filter = { usersID: new ObjectID(id) };

        List.find(filter, (err, list) => {
            if (err) {
                res.json({ error: 'An error has occurred.' });
            } else {
                const lists = [];
                list.forEach((list) => {
                    lists.push({
                        name: list.name,
                        id: list._id
                    });
                });
                res.status(200).json({ lists: lists });
            }
        });
    });

    app.get('/api/lists/:id', (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectID(id) };

        collection.findOne(filter, (err, list) => {
            if (err) {
                res.json({ error: 'An error has occurred.' });
            } else {
                res.status(200).json({ list: list });
            }
        });
    });

    app.put('/api/lists/:id', (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectID(id) };

        const list = {
            $set: { name: req.headers.name },
        };

        collection.updateOne(filter, list, (err, result) => {
            if (err) {
                res.json({ error: 'An error has occurred.' });
            } else {
                res.status(200).json({ name: req.headers.name });
            }
        });
    });

    app.delete('/api/lists/:id', (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectID(id) };

        collection.deleteOne(filter, (err, list) => {
            if (err) {
                res.json({ error: 'An error has occurred.' });
            } else {
                res.status(200).json({ message: 'List was deleted successfully.' });
            }
        });
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500).json(
            { message: err.message || 'Sorry something broke on the server!' },
        );
    });
};

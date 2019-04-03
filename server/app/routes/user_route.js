const cors = require('cors');
const cookieParser = require('cookie-parser');
const ObjectID = require('mongodb').ObjectID;


module.exports = (app, database) => {
    const collection = database.collection('users');

    app.use(cors());
    app.use(cookieParser());

    app.get('/api/user/me', (req, res) => {
        const id = req.cookies.id;
        const filter = { _id: new ObjectID(id) };

        collection.findOne(filter, (err, user) => {
            if (err) {
                res.json({ error: 'An error has occurred.' });
            } else {
                res.status(200).json({ user });
            }
        });
    });

    app.put('/api/user/me', (req, res) => {
        const id = req.cookies.id;
        const filter = { _id: new ObjectID(id) };

        const user = {
            $set: { username: req.body.username, email: req.body.email },
        };

        collection.updateOne(filter, user, (err, result) => {
            if (err) {
                res.json({ error: 'An error has occurred.' });
            } else {
                res.status(200).json({
                    username: req.body.username,
                    email: req.body.email,
                });
            }
        });
    });

    app.delete('/api/user/me', (req, res) => {
        const id = req.cookies.id;
        const filter = { _id: new ObjectID(id) };

        collection.deleteOne(filter, (err, user) => {
            if (err) {
                res.json({ error: 'An error has occurred.' });
            } else {
                res.status(401).json({ message: 'User was deleted or not authenticated.' });
            }
        });
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500).json(
            { message: err.message || 'Sorry something broke on the server!' },
        );
    });
};

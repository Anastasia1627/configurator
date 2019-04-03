const mongoose = require('mongoose');


const listSchema = new mongoose.Schema({
    name: { type: String },
    usersID: { type: [ String ] }
});

const List = mongoose.model('List', listSchema);

module.exports = List;

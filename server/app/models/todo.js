const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    name: { type: String },
    listID: { type: String },
    completed: { type: Boolean }
});

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;

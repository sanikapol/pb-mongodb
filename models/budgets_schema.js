const mongoose = require('mongoose')

const colorValidator = (v) => (/^#[A-Fa-f0-9]{6}$/i).test(v)

const budgetsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        maxlength: 7,
        validate: colorValidator,
        unique: true,
    }
}, {collection: 'budgets'})

module.exports = mongoose.model('budgets',budgetsSchema)
// ROUTE 4
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        items: { type: Object, required: false },
        client: { type: Object, required: false },
        payer: { type: Object, required: false },
        amount: { type: Object, required: false },
        statut: { type: Object, required: false },
    },
    { timestamps: true },   // Date post
)

module.exports = mongoose.model('order', Order)

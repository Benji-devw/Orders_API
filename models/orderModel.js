// ROUTE 4
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Order = new Schema(
    {
        orderNumber: { type: String, required: false},
        userId: { type: String, required: true },
        items: { type: Object, required: false },
        client: { type: Object, required: false },
        payer: { type: Object, required: false },
        amount: { type: Object, required: false },
        statut: { type: Object, required: false },
    },
    { timestamps: true },   // Date post
)

export default mongoose.model('order', Order)

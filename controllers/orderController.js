// ROUTE 3
const Order = require('../models/orderModel')

createOrder = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a order',
        })
    }

    const order = new Order({
        ...body,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    if (!order) {
        return res.status(400).json({ success: false, error: err })
    }

    order
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: order._id,
                message: 'order created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'order not created!',
            })
        })
}

updateOrder = async (req, res) => {
    const body = req.body
    // console.log('body', body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    Order.findOne({_id: req.params.id}, (err, order) => {
        // console.log('order', order)
        if (err) {
            return res.status(404).json({
                err,
                message: 'Product not found! !',
            })
        }
        order.items = body.items 
        order.client = body.client
        order.payer = body.payer
        order.amount = body.amount 
        order.statut = body.statut
        order
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: order._id,
                    message: 'order updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'order not updated!',
                })
            })
    })
}

deleteOrder = async (req, res) => {
    await Order.findOneAndDelete({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `order not found` })
        }

        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err))
}

getOrderById = async (req, res) => {
    await Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err))
}

getOrders = async (req, res) => {
    await Order.find({}, (err, orders) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: `order not found` })
        }
        return res.status(200).json({ success: true, data: orders })
    }).catch(err => console.log(err))
}

module.exports = {
    createOrder,
    deleteOrder,
    getOrders,
    updateOrder,
    getOrderById
}

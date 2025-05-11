const express = require('express')
const router = express.Router()

// ROUTE 2
const OrderCtrl = require('../controllers/orderController')

router.post('/order', OrderCtrl.createOrder)
router.delete('/order/:id', OrderCtrl.deleteOrder)
router.get('/order', OrderCtrl.getOrders)
router.put('/order/:id', OrderCtrl.updateOrder)
router.get('/order/:id', OrderCtrl.getOrderById)
router.post('/getorderbyordernumber', OrderCtrl.getOrderByOrderNumber)
router.get('/orders/user/:userId', OrderCtrl.getOrdersByUserId)
module.exports = router

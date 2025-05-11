import OrderCtrl from '../controllers/orderController.js'

async function orderRoutes (fastify, options) {
  fastify.post('/order', OrderCtrl.createOrder)
  fastify.delete('/order/:id', OrderCtrl.deleteOrder)
  fastify.get('/order', OrderCtrl.getOrders)
  fastify.put('/order/:id', OrderCtrl.updateOrder)
  fastify.get('/order/:id', OrderCtrl.getOrderById)
  fastify.post('/getorderbyordernumber', OrderCtrl.getOrderByOrderNumber)
  fastify.get('/orders/user/:userId', OrderCtrl.getOrdersByUserId)
}

export default orderRoutes

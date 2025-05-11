// ROUTE 3
import Order from '../models/orderModel.js'

const getOrderByOrderNumber = async (request, reply) => {
    let orderNumberValue = {};
    // Fastify parse le JSON automatiquement, request.body est déjà un objet
    // On s'attend à ce que le corps soit { "orderNumber": "..." }
    if (request.body && typeof request.body.orderNumber === 'string') {
        orderNumberValue = { orderNumber: request.body.orderNumber };
    } else {
        return reply.code(400).send({
            success: false,
            error: 'Invalid request body. Expecting { "orderNumber": "..." }',
        });
    }
    
    if (orderNumberValue.orderNumber.length === 15) {
        try {
            const data = await Order.find(orderNumberValue);
            if (data && data.length > 0) {
                return reply.code(200).send({
                    message: orderNumberValue, // Peut-être renvoyer juste le numéro de commande ici?
                    order: ({ orderNumber: data[0].orderNumber, items: data[0].items, date: data[0].createdAt})
                });
            } else {
                return reply.code(404).send({
                    success: false,
                    error: 'Order number not found',
                });
            }
        } catch (err) {
            console.error('Get order by number error:', err);
            return reply.code(500).send({ success: false, error: 'Internal server error' });
        }
    } else {
        return reply.code(400).send({
            success: false,
            error: 'Order number not valid (must be 15 characters)',
        });
    }
}

const createOrder = async (request, reply) => {
    const body = request.body;

    if (!body || Object.keys(body).length === 0) { // Vérification plus robuste pour un body vide
        return reply.code(400).send({
            success: false,
            error: 'You must provide an order',
        });
    }

    if (!body.userId) {
        return reply.code(400).send({
            success: false,
            error: 'You must provide a userId for the order',
        });
    }

    const order = new Order(body);

    try {
        await order.save();
        return reply.code(201).send({
            success: true,
            id: order._id,
            message: 'Order created!',
        });
    } catch (error) {
        console.error('Create order error:', error);
        return reply.code(400).send({
            error: error.message, // Envoi d'un message d'erreur plus clair
            message: 'Order not created!',
        });
    }
}

const updateOrder = async (request, reply) => {
    const { body, params } = request;

    if (!body || Object.keys(body).length === 0) {
        return reply.code(400).send({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    try {
        const order = await Order.findById(params.id);
        
        if (!order) {
            return reply.code(404).send({
                success: false,
                message: 'Order not found!',
            });
        }

        // Mise à jour des champs. S'assurer que seuls les champs autorisés sont mis à jour.
        // Par exemple, si body contient plus de champs que ceux attendus, ils seront ignorés ici.
        if (body.orderNumber) order.orderNumber = body.orderNumber;
        if (body.items) order.items = body.items; 
        if (body.client) order.client = body.client;
        if (body.payer) order.payer = body.payer;
        if (body.amount) order.amount = body.amount; 
        if (body.statut) order.statut = body.statut;
        // ... ajouter d'autres champs si nécessaire

        await order.save();
        return reply.code(200).send({
            success: true,
            id: order._id,
            message: 'Order updated!',
        });
    } catch (error) {
        console.error('Update order error:', error);
        if (error.kind === 'ObjectId') { // Si l'ID n'est pas un ObjectId valide
             return reply.code(400).send({ success: false, message: 'Invalid order ID format' });
        }
        return reply.code(500).send({
            error: error.message,
            message: 'Order not updated!',
        });
    }
}

const deleteOrder = async (request, reply) => {
    try {
        const order = await Order.findByIdAndDelete(request.params.id);

        if (!order) {
            return reply.code(404).send({ success: false, error: `Order not found` });
        }

        return reply.code(200).send({ success: true, data: order });
    } catch (err) {
        console.error('Delete order error:', err);
        if (err.kind === 'ObjectId') {
             return reply.code(400).send({ success: false, message: 'Invalid order ID format' });
        }
        return reply.code(500).send({ success: false, error: 'Internal server error' });
    }
}

const getOrderById = async (request, reply) => {
    try {
        const order = await Order.findById(request.params.id);
        if (!order) {
            return reply.code(404).send({ success: false, error: `Order not found` });
        }
        return reply.code(200).send({ success: true, data: order });
    } catch (err) {
        console.error('Get order by ID error:', err);
        if (err.kind === 'ObjectId') {
             return reply.code(400).send({ success: false, message: 'Invalid order ID format' });
        }
        return reply.code(500).send({ success: false, error: 'Internal server error' });
    }
}

const getOrders = async (request, reply) => {
    try {
        const orders = await Order.find({});
        // Il n'est pas nécessaire de renvoyer une 404 si la liste est vide, une liste vide est une réponse valide.
        return reply.code(200).send({ success: true, data: orders });
    } catch (err) {
        console.error('Get orders error:', err);
        return reply.code(500).send({ success: false, error: 'Internal server error' });
    }
}

const getOrdersByUserId = async (request, reply) => {
    try {
        const orders = await Order.find({ userId: request.params.userId });
        return reply.code(200).send({ success: true, data: orders });
    } catch (err) {
        console.error('Get orders by userID error:', err);
        // Pas besoin de vérifier err.kind ici car userId n'est pas forcément un ObjectId
        return reply.code(500).send({ success: false, error: err.message });
    }
}

// Exporter un objet avec toutes les fonctions
export default {
    createOrder,
    deleteOrder,
    getOrders,
    updateOrder,
    getOrderById,
    getOrderByOrderNumber,
    getOrdersByUserId
};

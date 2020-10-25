
const express = require('express'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    orderRouter = require('./routes/orderRouter'),
    db = require('./db/connectToDb'),
    app = express(),
    apiPort = 8802;
    // cors = require('cors'),

// Helmet
app.use(helmet());

// CORS (système de sécurité)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');    // accéder à notre API depuis n'importe quelle origine ( '*' ) ;
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');      // ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');     // envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  next();
});

// BODY-PARSER == parse les datas pr les lire (à placer au dessus des demande POST)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// ROUTE 1
app.use('/api', orderRouter)



app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
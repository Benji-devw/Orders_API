import mongoose from 'mongoose'

// Connect to Cluster on mongodbAtlas
mongoose
.connect('mongodb://0.0.0.0:27017/vallena')
    // .connect("mongodb+srv://mode_dev:Benben1337@vallena.aw6sr.mongodb.net/vallena?retryWrites=true&w=majority")
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(e => {
        console.error('Connection error', e.message)
        // console.log('Connexion à MongoDB échouée !'))
    })

const db = mongoose.connection

export default db
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')

// connecter db
mongoose.connect('mongodb+srv://tao:Qaz123456@cluster0.cd3g5yp.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(
  () =>
    console.log('Connexion à MongoDB réussie !')
).catch(
  () =>
    console.log('Connexion à MongoDB échouée !')
);

// permettra à toutes les demandes de toutes les origines d'accéder à notre API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(express.json());
app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)

module.exports = app;
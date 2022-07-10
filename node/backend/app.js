const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Thing = require('./models/obj').obj;
const Product = require('./models/obj').product;

// connecter db
mongoose.connect('mongodb+srv://tao:Qaz123456@cluster0.cd3g5yp.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => 
    console.log('Connexion à MongoDB réussie !')
  ).catch(() =>
    console.log('Connexion à MongoDB échouée !')
  );

app.use(express.json());

// permettra à toutes les demandes de toutes les origines d'accéder à notre API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// set router
app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save().then(thing => res.status(201).json({ thing }))
  .catch(error => 
    res.status(400).json(error))
});

// for one obj
app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(err => res.status(401).json({ err }));
});

// for all obj
app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(402).json({ error }));
});

// update
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

//supprimer 
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

// router for product

// find all product
app.get('/api/products', (req, res, next) => {
  Product.find()
  .then(product => res.status(200).json({products: product}))
  .catch(err => res.status(403).json({ err }));
});

app.get('/api/products/:id', (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json({product}))
    .catch(err => res.status(404).json({ err }));
});

app.post('/api/products', (req, res, next) => {
  console.log(req.body)
  delete req.body._id;
  const produ = new Product({
    ...req.body
  });
  produ.save().then(product => res.status(201).json({ product }))
  .catch(error =>
    res.status(405).json(error))
});

app.put('/api/products/:id', (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Modified!'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/products/:id', (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Deleted!'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;
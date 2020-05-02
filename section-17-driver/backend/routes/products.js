const Router = require('express').Router;
const mongodb = require('mongodb');
const Decimal128 = mongodb.Decimal128;

// call MongoDB utils
const db = require('../db');

const router = Router();

// Get list of products products
router.get('/', (req, res, next) => {
  // init array of product
  const products = [];

  // fetch data from MongoDB
  db.getDb()
    .db()
    .collection('products')
    .find()
    .forEach((productDoc) => {
      // ทำให้ number -> string
      productDoc.price = productDoc.price.toString();

      // add to array
      products.push(productDoc);
    })
    .then(() => {
      // send products array to client
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({ message: 'An error occurred' });
    });
});

// Get single product
router.get('/:id', (req, res, next) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

// Add new product
// Requires logged in user
router.post('', (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()),
    image: req.body.image,
  };

  // MongoDB call
  db.getDb()
    .db()
    .collection('products')
    .insertOne(newProduct)
    .then((result) => {
      // send to client
      res
        .status(201)
        .json({ message: 'Product added', productId: result.insertedId });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({ message: 'An error occurred' });
    });
});

// Edit existing product
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
    image: req.body.image,
  };
  console.log(updatedProduct);
  res.status(200).json({ message: 'Product updated', productId: 'DUMMY' });
});

// Delete a product
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  res.status(200).json({ message: 'Product deleted' });
});

module.exports = router;

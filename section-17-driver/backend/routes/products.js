const Router = require('express').Router;
const mongodb = require('mongodb');
const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectID;

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
  // fetch data by id
  db.getDb()
    .db()
    .collection('products')
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((product) => {
      // เมื่อ Javascript แสดงผล Decimal128 จะขึ้น Error ต้องปรับเป็น String
      product.price = product.price.toString();

      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ message: 'An error occurred' });
    });
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
    price: Decimal128.fromString(req.body.price.toString()),
    image: req.body.image,
  };

  // MongoDB call
  db.getDb()
    .db()
    .collection('products')
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedProduct })
    .then((result) => {
      // send to client
      res
        .status(200)
        .json({ message: 'Product updated', productId: req.params.id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    });
});

// Delete a product
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('products')
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      // send to client
      res.status(200).json({ message: 'Product deleted' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'An error occurred' });
    });
});

module.exports = router;

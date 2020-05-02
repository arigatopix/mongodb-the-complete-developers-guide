const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = Router();

const db = require('../db');

const createToken = () => {
  return jwt.sign({}, 'secret', { expiresIn: '1h' });
};

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  // Check if user login is valid

  // fetch user to form DB
  db.getDb()
    .db()
    .collection('users')
    .findOne({ email })
    .then((userDoc) => {
      // check bcypt password
      return bcrypt.compare(pw, userDoc.password);
    })
    .then((result) => {
      // รับ result จาก bcrypt.compare() เช็คว่า pw เข้ามากับ db ตรงมั้ย

      if (!result) {
        // ถ้า false แสดงผล error
        throw Error();
      }

      // If yes, create token and return it to client
      const token = createToken();

      res.status(200).json({ token: token, user: { email } });
    })
    .catch((err) => {
      res.status(401).json({
        message: 'Authentication failed, invalid username or password.',
      });
    });
});

router.post('/signup', (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  // Hash password before storing it in database => Encryption at Rest
  bcrypt
    .hash(pw, 12)
    .then((hashedPW) => {
      // Store hashedPW in database
      const token = createToken();

      // insert user to MongoDB
      db.getDb()
        .db()
        .collection('users')
        .insertOne({ email, password: hashedPW })
        .then((result) => {
          console.log(result);
          res
            .status(201)
            .json({ token: token, user: { email: req.body.email } });
        })
        .catch((err) => {
          console.log(err);

          res.status(500).json({ message: 'An error occurred' });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Creating the user failed.' });
    });
  // Add user to database
});

module.exports = router;

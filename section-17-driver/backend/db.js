const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoDbUri =
  'mongodb+srv://admindb:admindb@cluster0-yetfy.mongodb.net/shop?retryWrites=true&w=majority';

let _db;

const initDb = (callback) => {
  // * init db เมื่อ start server ขึ้นมา
  if (_db) {
    // กรณี connect db อยู่แล้ว
    console.log('Database is already initialized...');
    return callback(null, _db);
  }

  // กรณี mongodb ยังไม่ได้ run
  MongoClient.connect(mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((client) => {
      // store database
      _db = client;
      callback(null, _db);
      console.log('MongoDB Connected..');
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  // * ใช้เมื่อ route เรียกหา database
  if (!_db) {
    throw Error('Database not initialized');
  }

  // เรียก mongoDb ไปใช้งานเช่น clinet.db().collection('products').find()
  return _db;
};

module.exports = {
  initDb,
  getDb,
};

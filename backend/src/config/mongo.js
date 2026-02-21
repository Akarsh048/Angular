const mongoose = require('mongoose');

const connectMongo = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is missing');
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected');
};

module.exports = connectMongo;

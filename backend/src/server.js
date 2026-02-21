require('dotenv').config();
const app = require('./app');
const connectMongo = require('./config/mongo');
const { initSqlServer } = require('./config/sqlserver');

const PORT = Number(process.env.PORT || 5000);

const startServer = async () => {
  try {
    await connectMongo();
    await initSqlServer();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

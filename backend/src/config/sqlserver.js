const sql = require('mssql');

let poolPromise;

const initSqlServer = async () => {
  if (poolPromise) {
    return poolPromise;
  }

  const rawPort = process.env.SQLSERVER_PORT;
  const rawHost = process.env.SQLSERVER_HOST || 'localhost';
  const hostParts = rawHost.split('\\');
  const normalizedServer = hostParts[0];
  const hostInstance = hostParts[1];
  const normalizedInstance = process.env.SQLSERVER_INSTANCE || hostInstance || undefined;

  const config = {
    server: normalizedServer,
    port: rawPort ? Number(rawPort) : undefined,
    user: process.env.SQLSERVER_USER,
    password: process.env.SQLSERVER_PASSWORD,
    database: process.env.SQLSERVER_DATABASE,
    connectionTimeout: 30000,
    requestTimeout: 30000,
    options: {
      instanceName: normalizedInstance,
      encrypt: String(process.env.SQLSERVER_ENCRYPT || 'false').toLowerCase() === 'true',
      trustServerCertificate: true
    }
  };

  poolPromise = sql.connect(config);
  const pool = await poolPromise;

  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
    CREATE TABLE users (
      id INT IDENTITY(1,1) PRIMARY KEY,
      username NVARCHAR(100) NOT NULL UNIQUE,
      password NVARCHAR(255) NOT NULL,
      created_at DATETIME2 DEFAULT SYSUTCDATETIME()
    )
  `);

  console.log('SQL Server connected and users table ready');
  return poolPromise;
};

const getSqlServerPool = async () => {
  if (!poolPromise) {
    throw new Error('SQL Server pool is not initialized');
  }
  return poolPromise;
};

module.exports = { initSqlServer, getSqlServerPool, sql };

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getSqlServerPool, sql } = require('../config/sqlserver');

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const db = await getSqlServerPool();

    const existing = await db
      .request()
      .input('username', sql.NVarChar(100), username)
      .query('SELECT id FROM users WHERE username = @username');

    if (existing.recordset.length) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const inserted = await db
      .request()
      .input('username', sql.NVarChar(100), username)
      .input('password', sql.NVarChar(255), hashedPassword)
      .query(`
        INSERT INTO users (username, password)
        OUTPUT INSERTED.id
        VALUES (@username, @password)
      `);

    return res.status(201).json({ id: inserted.recordset[0].id, username });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const db = await getSqlServerPool();

    const rows = await db
      .request()
      .input('username', sql.NVarChar(100), username)
      .query('SELECT id, username, password FROM users WHERE username = @username');

    const user = rows.recordset[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login };

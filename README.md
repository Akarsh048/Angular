# Angular App

This is a full-stack Angular App with CRUD, authentication, orders API, and weather integration.

Stack:
- Angular frontend
- Node.js + Express backend
- MongoDB for products and orders
- SQL Server (SSMS) for users
- Open-Meteo API for weather data

## Project Structure

- `backend/` API + MongoDB + SQL Server
- `frontend/` Angular UI

## Features

### Product CRUD
- Create, list, update, delete products
- Fields: `id` (`_id`), `name`, `price`, `description`

### User Auth (SQL Server)
- Register with bcrypt password hashing
- Login with JWT token

### Orders API
- Entity fields:
  - `orderId` (`_id`)
  - `userId` (SQL Server `users.id`)
  - `productIds` (MongoDB product IDs)
  - `totalAmount`
- Endpoints:
  - `POST /api/orders`
  - `GET /api/orders/:id`
  - `PUT /api/orders/:id`
  - `DELETE /api/orders/:id`

### Third-party API Integration
- Weather data via Open-Meteo
- Endpoint: `GET /api/external/weather?lat=..&lon=..`

## Prerequisites

- Node.js 18+
- MongoDB running
- SQL Server running
- SSMS installed

## Database Setup

### MongoDB
Default URI:

`mongodb://127.0.0.1:27017/angular_app`

### SQL Server
Open SSMS and run:

```sql
CREATE DATABASE angular_app;
GO
USE angular_app;
GO

CREATE TABLE users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  username NVARCHAR(100) NOT NULL UNIQUE,
  password NVARCHAR(255) NOT NULL,
  created_at DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO
```

## Environment Variables

Edit `backend/.env`:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/angular_app
SQLSERVER_HOST=localhost
SQLSERVER_INSTANCE=
SQLSERVER_PORT=1433
SQLSERVER_USER=sa
SQLSERVER_PASSWORD=YourStrongPassword123!
SQLSERVER_DATABASE=angular_app
SQLSERVER_ENCRYPT=false
JWT_SECRET=super_secret_change_me
```

Notes:
- For named instance use `SQLSERVER_HOST=localhost\SQLEXPRESS` and leave `SQLSERVER_INSTANCE=`.
- For default instance keep `SQLSERVER_HOST=localhost` and `SQLSERVER_PORT=1433`.

## Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend URL: `http://localhost:5000`

## Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend URL: `http://localhost:4200`

## Tests

```bash
cd backend
npm test
```

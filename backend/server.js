const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const momoRoutes = require('./routes/momoRoutes');
const vnpayRoutes = require('./routes/vnpayRoutes');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);
app.use('/api/payment', momoRoutes);   // POST /api/payment/momo
app.use('/api/payment', vnpayRoutes);  // POST /api/payment/vnpay

// Error Handler
app.use(errorHandler);

// Kết nối MongoDB và khởi động server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
  });
});


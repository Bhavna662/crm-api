import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import customerRouter from './routes/customer.routes.js';
import logRouter from './routes/log.routes.js';
import authRouter from './routes/auth.routes.js';
import enquiryRoutes from './routes/enquiry.routes.js';
import calllogRoutes from './routes/calllog.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB connection error:', err));

// Routes (no /api prefix needed now)
app.use('/customer', customerRouter);     // /customer, /customer/count
app.use('/log', logRouter);               // /log, /log/count
app.use('/auth', authRouter);             // /auth/login, etc.
app.use('/enquiries', enquiryRoutes);     // /enquiries
app.use('/calllogs', calllogRoutes);      // /calllogs

app.get('/', (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
);



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

// Whitelisted origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://crm-ui-one.vercel.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy disallows access from origin ${origin}`), false);
    }
  },
  credentials: true,
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB connection error:', err));

// Application routes
app.use('/customer', customerRouter);
app.use('/log', logRouter);
app.use('/auth', authRouter);
app.use('/enquiries', enquiryRoutes);
app.use('/calllogs', calllogRoutes);

app.get('/', (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
);

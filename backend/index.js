import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import { PORT } from './config/env.js';
import adminRoutes from './routes/adminRoutes.js';

import recruiterRoutes from './routes/recruiterRoute.js';

const app = express();

// Middleware

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
// Database connection
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('hello');
});
app.use(express.static('uploads'));
app.use('/api/admin', adminRoutes);

app.use('/api/recruiter', recruiterRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

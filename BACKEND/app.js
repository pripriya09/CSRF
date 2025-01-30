import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import adminRouter from './admincsrf/adminrouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5174", "http://localhost:5173",""
    ],
    credentials: true,
    allowedHeaders:["xsrf-token","Content-Type"]
  })
);
app.use(cookieParser());

app.use('/admin', adminRouter);

// Start server
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});

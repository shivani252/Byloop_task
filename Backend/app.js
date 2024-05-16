import express from 'express';
import db from './database/databaseConnectivity.js';
import CarRouter from './routes/carRoutes.js';
import AdminRouter from './routes/admin.js';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/car', CarRouter);
app.use('/admin', AdminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


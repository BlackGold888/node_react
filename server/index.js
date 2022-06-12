import express from 'express';
import { router as TodoRoutes } from './routes/TodoRoute.js';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(TodoRoutes);
app.listen(port,() => console.log(`Server started on http://localhost:3000`));
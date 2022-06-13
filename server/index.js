import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { router as AdminRoutes } from './routes/AdminRoute.js';
import { router as TodoRoutes } from './routes/TodoRoute.js';

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(cookieParser());
const port = process.env.PORT || 3000;

app.use(express.json())

//Routes
app.use(TodoRoutes);
app.use(AdminRoutes);

app.listen(port,() => console.log(`Server started on http://localhost:3000`));
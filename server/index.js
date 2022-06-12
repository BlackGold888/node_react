import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ status: true })
})

app.listen(3000,() => console.log(`Server started on http://localhost:3000`));
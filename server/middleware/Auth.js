import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    const token = bearerHeader && bearerHeader.split(' ')[1];
    if (token == null || token === 'null') return res.status(401).json({
        status: false,
        message: 'Access denied. No token provided.'
    });
    jwt.verify(token, `${process.env.TOKEN_SECRET}`, () => {
        next();
    })
}
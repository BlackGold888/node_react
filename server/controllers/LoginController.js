import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { password, login } = req.body;
    if (login === 'admin' && password === '123') {
        const token = jwt.sign({ name: 'admin', login: 'admin' }, 'khamidalakkhali');
        res.status(200).json({
            status: true,
            token: token
        });
    }else{
        res.status(401).json({
            status: false,
            message: 'Неверный логин или пароль'
        });
    }
}


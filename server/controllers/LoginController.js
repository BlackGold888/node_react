import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { password, login } = req.body;
    console.log(password, login);
    if (login == 'admin' && password == '123') {
        const token = jwt.sign({ name: 'admin', login: 'admin' }, 'khamidalakkhali');
        res.status(200).json({
            status: true,
            token: token
        });
    }
}


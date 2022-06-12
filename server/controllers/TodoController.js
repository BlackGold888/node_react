const tempData = [
    {
        id: 0,
        name: 'BlackGold',
        email: 'blackgold@gmail.com',
        text: 'Todo 1',
        status: false
    },
    {
        id: 0,
        name: 'BlackGold',
        email: 'blackgold@gmail.com',
        text: 'Todo 1',
        status: false
    },
    {
        id: 0,
        name: 'BlackGold',
        email: 'blackgold@gmail.com',
        text: 'Todo 1',
        status: false
    },
    {
        id: 0,
        name: 'BlackGold',
        email: 'blackgold@gmail.com',
        text: 'Todo 1',
        status: true
    }
]

const getAllTodos = (req, res) => {
    res.status(200).json(tempData);
}

export { getAllTodos }
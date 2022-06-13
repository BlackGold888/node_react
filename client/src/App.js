import './App.css';
import TodoList from './components/TodoList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoEdit from './components/TodoEdit';
import Login from './components/Login';
import TodoAdd from './components/TodoAdd';

//Helpers
export const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
};

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<TodoList />} />
                    <Route path={'/edit'} element={<TodoEdit />} />
                    <Route path={'/add'} element={<TodoAdd />} />
                    <Route path={'/login'} element={<Login />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme={'dark'}
            />
        </div>
    );
}

export default App;

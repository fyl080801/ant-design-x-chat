import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Chat from './pages/Chat';
import Welcome from './pages/Welcome';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/welcome',
                element: <Welcome />,
            },
            {
                path: '/chat',
                element: <Chat />,
            },
        ],
    },
]);

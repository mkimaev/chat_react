
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootPage from './pages/RootPage';
import HomePage from './pages/HomePage';
import KeysPage from './pages/KeysPage';
import PathNotFound from './components/test/PathNotFound';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <RootPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            { path: 'keys', element: <KeysPage /> },
            //{ path: 'sessions/:id', element: <SessionPage /> },
            { path: '*', element: <PathNotFound /> },
        ],
    },
]);

export const router = Router;

function App() {
    return <RouterProvider router={Router} />;
}

export default App

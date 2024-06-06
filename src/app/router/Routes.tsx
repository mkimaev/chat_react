import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Chat from "../../features/chat/Chat";
import NotFound from "../../features/errors/NotFound";


export const routes: RouteObject[] = [
    {
        path: "", element: <App /> ,
        children: [
            { path: 'chat', element: <Chat /> },
            { path: 'not-found', element: <NotFound />},
            // { path: 'server-error', element: <ServerError />},
            // { path: '*', element: <Navigate replace to='/not-found' />},
        ]
    }
    
]

export const router = createBrowserRouter(routes);
import { Outlet } from 'react-router-dom';

import KeysContextProvider from '../store/store-context.tsx';
import NavBarComponent from '../components/navbar/NavBarComponent.tsx';

export default function RootPage() {
    return (
        <KeysContextProvider>
            <NavBarComponent />
            <Outlet />
        </KeysContextProvider>
    );
}
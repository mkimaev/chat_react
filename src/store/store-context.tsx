import { ReactNode, createContext, useContext, useReducer } from 'react';
import DoorKey from '../models/doorKey';
import keysReducer from './key-reducer';
import IMyKey from '../models/myKey';


export type KeyState = {
    keys: DoorKey[],
    myKeys: IMyKey[],
}

type KeyContextValue = KeyState & {
    changeKeyState: (key: DoorKey) => void,
    setKeys: (keys: DoorKey[]) => void,
    setMyKeys: (myKeys: IMyKey[]) => void,
}

export const KeyContext = createContext<KeyContextValue | null>(null);

export function useStore() {
    const context = useContext(KeyContext);

    if (!context) {
        throw new Error(
            'useStore must be used within a KeyContextProvider'
        );
    }

    return context;
}

export default function KeysContextProvider({ children }: { children: ReactNode }) {
    
    const [keyState, dispatchKey] = useReducer(keysReducer, { keys: [], myKeys: new Array<IMyKey>() });

    const ctxValue: KeyContextValue = {
        keys: keyState.keys,
        myKeys: keyState.myKeys,
        setKeys: (keys: DoorKey[]) => dispatchKey({ type: 'set_keys', keys }),
        changeKeyState: (key: DoorKey) => dispatchKey({ type: 'change_key_state', key }),
        setMyKeys: (myKeys: IMyKey[]) => dispatchKey({ type: 'set_myKeys', myKeys }),
    };

    return (
        <KeyContext.Provider value={ctxValue}>
            {children}
        </KeyContext.Provider>
    );
}

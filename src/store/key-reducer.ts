
import DoorKey from "../models/doorKey"
import IMyKey from "../models/myKey";
import { KeyState } from "./store-context";

type SetKeyAction = {
    type: 'change_key_state',
    key: DoorKey,
}

type SetKeysAction = {
    type: 'set_keys',
    keys: DoorKey[],
}

type SetMyKeysAction = {
    type: 'set_myKeys',
    myKeys: IMyKey[],
}

type KeyAction = SetKeyAction | SetKeysAction | SetMyKeysAction;

export default function keysReducer(state: KeyState, action: KeyAction): KeyState {

    switch (action.type) {
        case 'change_key_state':
            let keyIndex = state.keys.findIndex(x => x.id == action.key.id);

            if (keyIndex === -1) {
                return state;
            }

            state.keys[keyIndex] = action.key;

            return {
                ...state,
                keys: state.keys
            };

        case 'set_keys':

            return {
                ...state,
                keys: action.keys
            };

        case 'set_myKeys':

            return {
                ...state,
                myKeys: action.myKeys
            };

        default:
            return state;
    }
}


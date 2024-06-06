import { createContext, useContext } from "react";
import MessageStore from "../stores/messageStore";
import CommonStore from "../stores/commonStore";

interface IMessageStore {
    messageStore: MessageStore;
    commonStore: CommonStore;
}

export const mainStore: IMessageStore = {
    messageStore: new MessageStore(),
    commonStore: new CommonStore(),
}

export const ChatContext = createContext(mainStore);

export function useStore(){
    return useContext(ChatContext);
}
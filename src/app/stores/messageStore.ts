import { makeAutoObservable } from "mobx";
import { Message } from "../models/message";
import { getMessages } from "../../app/stores/seedData";

export default class MessageStore{
    private _messages: Message[] = getMessages();

    constructor() {
        makeAutoObservable(this);
    }

    get count(): number {
        return this._messages.length;
    }

    get messages(): Message[] {
        return this._messages;
    }

    addMessage(message: Message) {
        this._messages.push(message);
    }
}
import { Message, MessageFrom } from "../models/message";

let id: number = 0;
let firstMessage: Message = new Message(++id, MessageFrom.Bot, "plaintext", "Hello! May I help you?");
firstMessage.isFirst = true;

const messages: Message[] = [
    firstMessage
]

export function getMessages() {
    return messages;
}
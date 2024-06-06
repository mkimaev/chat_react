import { ReactNode } from "react";
import IUser from "./user";

export enum MessageFrom {
    User,
    Bot
}

export type ResponseType = 'plaintext' | 'chart';

export interface IMessageFromBot {
    id: number,
    text: string,
    dateTime: Date,
}

export class Message {
    public dateTime: Date = new Date();
    public data?: ReactNode | any;
    public isFirst?: boolean;


    constructor(
        public id: number,
        public from: MessageFrom,
        public responseType: ResponseType = 'plaintext',
        public messageText: string = '',
    ) { }

    get author() {
        let bot: IUser = {
            username: 'Demo_Bot',
            image: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg'
        }

        return this.from === MessageFrom.Bot ? bot : null;
    }
}
import { Segment, Input, Form } from "semantic-ui-react";
import { useEffect, useRef, type FormEvent } from "react";
import { useStore } from "../../app/contexts/chatContext";
import { observer } from "mobx-react-lite";
import { IMessageFromBot, Message, MessageFrom, ResponseType } from '../../app/models/message';
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

export default observer(function MessageForm() {
    const { commonStore, messageStore } = useStore();
    const quickValue = commonStore.quickQuiestionValue;

    let messageTextRef = useRef<any>(quickValue);

    useEffect(() => {
        messageTextRef.current.inputRef.current.value = quickValue;
        messageTextRef.current.focus();
    }, [quickValue]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const messageText = messageTextRef.current.inputRef.current.value;
        event.currentTarget.reset();
        await handleSendMessage(messageText)
    }

    const handleSendMessage = async (text: string = '') => {
        const userMessage: Message = createMessage(MessageFrom.User, 'plaintext', text);
        messageStore.addMessage(userMessage);

        let response: IMessageFromBot[] | null = null;
        //request to web API start
        try {
            response = await agent.Messages.sendRequest(text);
            toast.success('Data received')
        } catch (error) {
            console.log(error);
        }
        //request to web API end

        const data = JSON.stringify(response);
        let messageType: ResponseType = (text.indexOf('[chart]') > 0) ? 'chart' : 'plaintext';
        const botResponseMessage: Message = createMessage(MessageFrom.Bot, messageType, null!, data);
        messageStore.addMessage(botResponseMessage);
    }

    function createMessage(from: MessageFrom, responseType: ResponseType, text?: string,  data?: any ){

        if  (from === MessageFrom.Bot)
            text = 'I have found this...';

        let message = new Message(messageStore.count + 1, from, responseType, text);

        if (data)
            message.data = data;

        return message;
    }

    return (
        <Segment attached>
            <Form onSubmit={handleSubmit}>
                <Input
                    fluid
                    action={{ icon: 'send', color: commonStore.mainColor }}
                    placeholder='Type your question...'
                    ref={messageTextRef}
                />
            </Form>
        </Segment>
    );
});
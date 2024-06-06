import { Segment } from "semantic-ui-react";
import MessageComponent from "./MessageComponent";
import MessageForm from "./MessageForm";
import { useStore } from "../../app/contexts/chatContext";
import { observer } from "mobx-react-lite";

export default observer(function Conversation() {

    const { messageStore } = useStore();

    return (
        <>
            <Segment attached style={{ height: '500px', overflow: 'auto' }} >
                {messageStore.messages && messageStore.messages.map((message) =>
                    <MessageComponent key={message.id} message={message} />
                )}
            </Segment>

            <MessageForm />
        </>
    );
});


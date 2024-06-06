import { Segment, Icon, Label } from "semantic-ui-react";

export default function ConversationDetailHeader() {
    return (
        <Segment attached='top' textAlign='left'>
            <div>
                <Icon name='arrow left' />
                <Label as='a' image>
                    <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                    Joe
                </Label>
            </div>
        </Segment>
    );
}
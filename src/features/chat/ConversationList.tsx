import { Menu, MenuItem, Header, HeaderContent, HeaderSubheader, Label, Image } from "semantic-ui-react";

export function ConversationList() {
    return (
        <Menu vertical fluid>
            <MenuItem active={true}
                name='inbox'
            >
                <Header as='h4' image>
                    <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' rounded size='mini' />
                    <HeaderContent>
                        Joe
                        <HeaderSubheader>Human Resources</HeaderSubheader>
                    </HeaderContent>
                </Header>
                <Label color='teal'>1</Label>
            </MenuItem>
        </Menu>
    );
}
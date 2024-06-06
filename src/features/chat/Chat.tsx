import { Container, Grid, GridColumn, Header, Icon, Segment, SemanticWIDTHS } from 'semantic-ui-react'
import Conversation from './Conversation';
import { ChatContext, mainStore } from '../../app/contexts/chatContext';

export default function Chat() {
    let gridWidth: SemanticWIDTHS = 16;
    let leftSifeBarWidth: SemanticWIDTHS = 2;

    return (
        <ChatContext.Provider value={mainStore}>
            <Container>
                <Segment color={mainStore.commonStore.mainColor}>
                    <Grid>
                        <GridColumn verticalAlign='middle' width={leftSifeBarWidth}>
                            <Header as='h3' icon textAlign='center' color='grey'>
                                <Icon name='chat' color={mainStore.commonStore.mainColor} />
                            </Header>
                            {/* <ConversationList /> */}
                        </GridColumn>

                        <GridColumn width={(gridWidth - leftSifeBarWidth) as SemanticWIDTHS} >
                            {/* <ConversationDetailHeader /> */}
                            <Conversation />
                        </GridColumn>
                    </Grid>
                </Segment>
            </Container>
        </ChatContext.Provider>
    );
}
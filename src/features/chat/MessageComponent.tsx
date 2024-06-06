import { CommentGroup, CommentAvatar, CommentContent, CommentAuthor, CommentMetadata, CommentText, Comment, Container, Grid, GridColumn, Header } from "semantic-ui-react"
import { Message, MessageFrom } from "../../app/models/message"
import styles from "./MessageComponent.module.css"
import RecommendedQuiestions from "./RecommendedQuiestions";
import { BarChart } from "@mui/x-charts/BarChart";

interface Props {
    message: Message
}


export default function MessageComponent({ message }: Props) {

    let textSize = { fontSize: '0.9em' };

    return (
        <Grid columns={2} >
            <GridColumn width={message.data ? 16 : 10}>
                {message.from === MessageFrom.Bot &&
                    <CommentGroup className={styles.botMessage}>
                        <Comment>
                            <CommentAvatar as='a' src={message.author?.image} />
                            <CommentContent>
                                <CommentAuthor as='a'>{message.author?.username}</CommentAuthor>
                                <CommentMetadata>
                                    <span>{message.dateTime.toLocaleTimeString()}</span>
                                </CommentMetadata>
                                <CommentText style={textSize}>
                                    {message.messageText}
                                </CommentText>

                                {message.isFirst &&
                                    <RecommendedQuiestions />
                                }

                                {message.responseType == 'chart' && message.data &&
                                    <>
                                        <Header textAlign="center" as='h5'>
                                            Information about {'<address>'}
                                        </Header>

                                        <BarChart
                                            xAxis={[{ scaleType: 'band', data: ['Group_a', 'Group_b', 'Group_c'] }]}
                                            series={[
                                                { data: [1, 3, 5] },
                                                { data: [1, 3, 5] },
                                                { data: [1, 3, 5] },
                                            ]}
                                            width={400}
                                            height={200}
                                        />
                                    </>
                                }

                                {message.responseType == 'plaintext' && message.data &&
                                    // <TableComponent users={message.data} />
                                    message.data
                                }

                            </CommentContent>
                        </Comment>
                    </CommentGroup>
                }
            </GridColumn>
            <GridColumn width={6}>
                {message.from === MessageFrom.User &&
                    <Container textAlign='right' className={styles.ownMessage}>
                        <CommentGroup >
                            <Comment>
                                <CommentContent>
                                    <CommentMetadata>
                                        <span>{message.dateTime.toLocaleTimeString()}</span>
                                    </CommentMetadata>
                                    <CommentText style={textSize} >{message.messageText}</CommentText>
                                </CommentContent>
                            </Comment>
                        </CommentGroup>
                    </Container>
                }
            </GridColumn>
        </Grid>
    );
}
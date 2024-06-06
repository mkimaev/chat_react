
import { Segment, Label, List, ListItem } from "semantic-ui-react";
import { useStore } from "../../app/contexts/chatContext";

export default function RecommendedQuiestions() {
    const { commonStore } = useStore();
    const { mainColor } = commonStore;

    const itemTextList: string[] = [
        'What is the difference in occupied rental units by multifamilies in 2010 and now?',
        'What is current YoY change in average rent?',
        'Summarize historical vaccancies rates since 2000.',
        'List the number - the average of rental units under construction in history data and now.',
        'What is the total number Assisted Households (2019)? [chart]',
        'What is a battery?',
    ];

    const handleLabelOnClick = (text: string) => {
        commonStore.quickQuiestionValue = text;
    }

    return (
        <Segment color={mainColor} style={{ width: '90%' }}>
            <Label color={mainColor}>Recommended questions:</Label>
            <List>
                {itemTextList.map((itemText, index) =>
                    <ListItem key={index}>
                        <Label style={{ textAlign: 'left', fontWeight: '100', fontSize: '0.9em' }}
                            horizontal as={'a'}
                            onClick={() => { handleLabelOnClick(itemText) }}
                            content={itemText}
                            basic
                        />
                    </ListItem>
                )}
            </List>
        </Segment>
    )
};
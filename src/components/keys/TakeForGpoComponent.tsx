import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { IconButton, Tooltip } from '@mui/material';

interface AddForGpoComponentprops {
    onClick: () => void,
}
export default function TakeForGpoComponent({ onClick }: AddForGpoComponentprops) {

    return (
        <>
            <Tooltip title="take for GPO" color="red">
                <IconButton aria-label="delete" color="warning" onClick={() => onClick()}>
                    <PersonAddIcon color="success" />
                </IconButton>
            </Tooltip>
        </>)
}
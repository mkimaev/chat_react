import { Box, Chip, Paper, styled } from "@mui/material";
import { useStore } from "../../store/store-context";
import keyService from "../../services/key-service";
import IMyKey from "../../models/myKey";
import { toast } from "react-toastify";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '0.5em',
}));

function sortStringFn(a: IMyKey, b: IMyKey) {
    const nameA = a.siteName.toUpperCase(); // ignore upper and lowercase
    const nameB = b.siteName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
}

export default function MyKeysComponent() {
    const { myKeys, setMyKeys } = useStore();

    async function handleReturnMyKey(id: number) {
        await keyService.backMykey(id);
        setMyKeys(myKeys.filter(x => x.id !== id));
        toast.success('The key is returned.')
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
            }}
        >
            {myKeys.sort(sortStringFn).map((key) =>
                <Item key={key.id}>
                    <Chip 
                        color={key.siteName.indexOf('_red') > -1 ? "error" : "success"} 
                        label={key.siteName} 
                        onDelete={() => handleReturnMyKey(key.id)} />

                    <p style={{ fontSize: '0.85em' }}><i>{key.lastAction}</i></p>
                </Item>
            )}
        </Box>
    );
}

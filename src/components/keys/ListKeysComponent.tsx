
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoorKeyComponent from './DoorKeyComponent';
import HistoryIcon from '@mui/icons-material/History';
import DoorKey from '../../models/doorKey';
import { useStore } from '../../store/store-context';
import keyService from '../../services/key-service';

export default function ListKeysComponent() {
    let { keys, changeKeyState, myKeys, setMyKeys } = useStore();

    async function hanldeTakeClick(doorKey: DoorKey) {
        const isTake: boolean = doorKey.location === 'office' ? true : false;
        const updatedKey = await keyService.toggleKeyLocation(doorKey);
        changeKeyState(updatedKey);
        
        if (isTake){
            setMyKeys([...myKeys, { 
                id: updatedKey.id, 
                siteName: updatedKey.siteName, 
                lastAction: updatedKey.lastUserAction, 
            } ]);
        }

    }

    async function handleChangeComment(doorKey: DoorKey) {
        await keyService.changeComment(doorKey.id, doorKey.lastComment);
        changeKeyState(doorKey);
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table" >
                <TableHead sx={{ backgroundColor: 'info.main', }}>
                    <TableRow>
                        <TableCell sx={{ color: 'yellow', fontWeight: '700' }} align="center">key name</TableCell>
                        <TableCell sx={{ color: 'yellow', fontWeight: '700' }} align="center">where?</TableCell>
                        <TableCell sx={{ color: 'yellow', fontWeight: '700' }} align="center">action</TableCell>
                        <TableCell sx={{ color: 'yellow', fontWeight: '700' }} align="center">gpo</TableCell>
                        <TableCell sx={{ color: 'yellow', fontWeight: '700' }} align="center">coordinate</TableCell>
                        <TableCell sx={{ color: 'yellow', fontWeight: '700' }} align="center">comment</TableCell>
                        <TableCell sx={{ color: 'yellow', fontWeight: '700' }} align="center"> last actions <HistoryIcon /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {keys.map((doorKey, index) => (
                        <DoorKeyComponent key={index} doorKey={doorKey} onTakeBack={hanldeTakeClick} onChangeComment={handleChangeComment}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

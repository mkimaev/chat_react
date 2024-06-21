import { Badge, Chip, Divider, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useStore } from "../../store/store-context";
import DoorKey from "../../models/doorKey";
import keyService from "../../services/key-service";
import IMyKey from "../../models/myKey";


interface KeyDashboardProps {
    setMode: (text: 'main' | 'my-keys') => void;
}

export default function KeyDashboard({ setMode }: KeyDashboardProps) {
    const { keys, setKeys, myKeys, setMyKeys } = useStore();
    const [whereCriteria, setWhereCriteria] = useState('-');
    const [sitenameCriteria, setSitenameCriteria] = useState('');
    const [byUserCriteria, setByUserCriteria] = useState('');
    const [searchingCount, setSearchingCount] = useState(keys.length); //keys.length

    useEffect(() => {
        setSearchingCount(keys.length);
        fetchMyKeys();
    }, [])

    async function fetchMyKeys() {
        const keysFromService: DoorKey[] = await keyService.getMyKeys();
        const myKeys: IMyKey[] = keysFromService.map(item => {
            let myKey: IMyKey = { 
                id: item.id, 
                siteName: item.siteName, 
                lastAction: item.lastUserAction, 
            };
            return myKey;
        });
        setMyKeys(myKeys);
    }

    const handleByWhereClick = async (event: SelectChangeEvent) => {
        setMode('main');
        const byWhere: string = event.target.value;
        setWhereCriteria(byWhere);
        const keysFromService: DoorKey[] = await keyService.getKeysBy({ byWhere });
        setSearchingCount(keysFromService.length);
        setKeys(keysFromService.slice(-20));
    };

    const handleBySitenameClick = async () => {
        if (sitenameCriteria) {
            setMode('main');
            const keysFromService: DoorKey[] = await keyService.getKeysBy({ sitename: sitenameCriteria });
            setSearchingCount(keysFromService.length);
            setKeys(keysFromService.slice(-20));
            setSitenameCriteria('');
        }
    };

    const handleByDateOrUserClick = async () => {
        if (byUserCriteria) {
            setMode('main');
            const keysFromService: DoorKey[] = await keyService.getKeysBy({ byUser: byUserCriteria });
            setSearchingCount(keysFromService.length);
            setKeys(keysFromService.slice(-20));
            setByUserCriteria('');
        }
    };

    const handleShowMyKeysClick = async () => {
        setMode('my-keys');
    };

    return (

        <Paper elevation={2}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 'lg' }}

        >

            <div style={{ padding: '1.5em' }}>
                <Badge badgeContent={searchingCount} color="warning" max={5000}>
                    <SearchIcon />
                </Badge>
            </div>

            <div>
                <FormControl sx={{ minWidth: 100, p: 1, ml: 3 }} variant="standard" size="small">
                    <InputLabel id="demo-simple-select-label">Where</InputLabel>
                    <Select size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={whereCriteria}
                        label="Where"
                        onChange={handleByWhereClick}
                    >
                        <MenuItem disabled value={'-'}>none</MenuItem>
                        <MenuItem value={'on hand'}>on hand</MenuItem>
                        <MenuItem value={'office'}>office</MenuItem>
                        <MenuItem value={'lost'}>lost</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <InputBase onFocus={() => setWhereCriteria('')}
                sx={{ ml: 1, flex: 1, maxWidth: 200 }}
                placeholder="Search by site name"
                inputProps={{ 'aria-label': 'Search by site name' }}
                onChange={(e) => setSitenameCriteria(e.currentTarget.value)}
                value={sitenameCriteria}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => handleBySitenameClick()}>
                <SearchIcon color="info" />
            </IconButton>

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <InputBase onFocus={() => setWhereCriteria('')}
                sx={{ ml: 1, flex: 1, maxWidth: 200 }}
                placeholder="Search by date or by user"
                inputProps={{ 'aria-label': 'Search by user' }}
                onChange={(e) => setByUserCriteria(e.currentTarget.value)}
                value={byUserCriteria}
            />

            <IconButton onClick={() => handleByDateOrUserClick()}
                type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon color="secondary" />
            </IconButton>

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <Tooltip title="Show my keys">
                <Badge badgeContent={myKeys.length} color="error" max={500}>
                    <Chip onClick={() => handleShowMyKeysClick()}
                        sx={{ p: 1, ml: 1 }}
                        label='My keys'
                        icon={<KeyIcon color="info" />}
                        clickable
                        variant='outlined' color='info'
                    />
                </Badge>
            </Tooltip>
        </Paper>
    );
}
import { TableRow, TableCell, Chip, Alert, Paper } from "@mui/material";

import EngineeringIcon from '@mui/icons-material/Engineering';
import ApartmentIcon from '@mui/icons-material/Apartment';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import SkateboardingIcon from '@mui/icons-material/Skateboarding';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import DoorKey from "../../models/doorKey";
import { useState } from "react";
import TakeForGpoComponent from "./TakeForGpoComponent";
import GpoModalForm from "./GpoModalForm";
import LoadingButton from '@mui/lab/LoadingButton';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import EditCommentModalForm from "./EditCommentModalForm";


type DoorKeyProps = {
    doorKey: DoorKey;
    onTakeBack: (doorKey: DoorKey) => void;
    onChangeComment: (doorKey: DoorKey) => void;
}

function defineLocation(key: DoorKey): 'office' | 'gpo' | 'on hand' | 'lost' {
    let labelText: 'office' | 'gpo' | 'on hand' | 'lost' = key.location;

    if (key.location === 'on hand' && key.gpo) {
        labelText = 'gpo';
    }

    if (key.location === 'lost') {
        labelText = 'lost';
    }

    return labelText;
};

export default function DoorKeyComponent({ doorKey, onTakeBack, onChangeComment }: DoorKeyProps) {
    const [isAddingGpo, setIsAddingGpo] = useState(false);
    const [isAddingComment, setIsAddingComment] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddGpo = (gpoName: string) => {
        doorKey.gpo = gpoName;
        onTakeBack(doorKey)
    }

    const handleAddComment = (commentText: string) => {
        doorKey.lastComment = commentText;
        onChangeComment(doorKey);
    }

    const handleTakeReturnKey = () => {
        setIsLoading(true);
        onTakeBack(doorKey);
        setIsLoading(false);
    }

    const handleDisplayCommentModal = () => {
        setIsAddingComment(true);
    }

    const handleRemoveComment = () => {
        let agree = confirm("Are you sure you want remove comment?");

        if (agree) {
            doorKey.lastComment = "";
            onChangeComment(doorKey)
        }
    }

    return (
        <>
            {isAddingGpo && <GpoModalForm
                onGetValue={handleAddGpo}
                onDone={() => setIsAddingGpo(false)}
            />}
            {isAddingComment && <EditCommentModalForm
                onGetValue={handleAddComment}
                onDone={() => setIsAddingComment(false)}
            />}

            {/* <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 }, maxWidth: '100px' }}  > */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}  >

                {/* SITE NAME COL*/}
                <TableCell component="th" scope="row"> {/* SITE NAME COL*/}
                    {doorKey.siteName.toLowerCase().indexOf('_red') == -1 ?
                        <Chip
                            label={doorKey.siteName}
                            component="a" href={`#`} clickable
                            variant='outlined' color='success'
                        /> :
                        <Chip
                            label={doorKey.siteName}
                            component="a" href={`#`} clickable
                            variant='outlined' color='error'
                        />
                    }
                </TableCell>

                {/* WHERE COL       <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', minWidth: '100px' }} align="left"> */}
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }} align="left">
                    <span>
                        {doorKey.isInOffice ? (<ApartmentIcon color='success' />) :
                            <span>
                                {defineLocation(doorKey) === 'on hand' && <EngineeringIcon color='primary' />}
                                {defineLocation(doorKey) === 'gpo' && <SkateboardingIcon color='warning' />}
                                {defineLocation(doorKey) === 'lost' && <WarningIcon color='error' />}
                            </span>
                        }
                        &nbsp;{defineLocation(doorKey)}
                    </span>
                </TableCell>

                {/* ACTION COL */}
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }} align="left">
                    {doorKey.isInOffice ?
                        (
                            <LoadingButton loading={isLoading} variant="contained" color='info' size='small' startIcon={<SwipeRightIcon />}
                                onClick={() => handleTakeReturnKey()}
                            >
                                take
                            </LoadingButton>
                        )
                        :
                        <span>
                            {defineLocation(doorKey) === 'lost' ? null :
                                <LoadingButton loading={isLoading}
                                    onClick={() => handleTakeReturnKey()}
                                    variant="contained" color='inherit' size='small'
                                    startIcon={<KeyboardReturnIcon />} >
                                    back
                                </LoadingButton>
                            }
                        </span>
                    }
                </TableCell>

                {/* take for GPO */}
                <TableCell align="left">
                    {(doorKey.isInOffice && doorKey.gpo.length == 0) ?
                        <TakeForGpoComponent onClick={() => setIsAddingGpo(true)} />
                        :
                        doorKey.gpo}
                </TableCell>

                {/* coordinate <Paper elevation={0} sx={{ textAlign: 'center', fontSize: '0.85em', minWidth: '100px' }}> */}
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }} align="right">
                    <Paper elevation={0} sx={{ textAlign: 'center', fontSize: '0.85em' }}>
                        <span><LocationOnIcon fontSize="small" color="info" /></span>
                        {doorKey.coordinates}
                    </Paper>
                </TableCell>

                {/* lastComment 
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', maxWidth: '300px' }} align="left">
                */}
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }} align="left">
                    {doorKey.lastComment &&
                        <Alert severity='error' sx={{ border: '1px solid rgba(224, 224, 224, 1)', fontSize: '0.85em' }}>
                            {doorKey.lastComment}
                            <IconButton
                                onClick={() => handleRemoveComment()}
                                size="small" aria-label="delete" color="error">
                                <DeleteIcon sx={{ fontSize: '1em' }} />
                            </IconButton>
                        </Alert>
                    }

                    {!doorKey.lastComment &&
                        <IconButton onClick={() => handleDisplayCommentModal()} size="small" aria-label="add comment" >
                            <MapsUgcIcon />
                        </IconButton>
                    }
                </TableCell>

                {/* lastUserAction <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', maxWidth: '150px' }} align="left">  */}
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }} align="left">
                    <Alert severity={doorKey.isInOffice ? 'success' : 'info'} sx={{ border: '1px solid rgba(224, 224, 224, 1)', fontSize: '0.85em' }}>

                        <span dangerouslySetInnerHTML={{ __html: doorKey.lastUserAction }}></span>
                    </Alert>
                </TableCell>
            </TableRow >
        </>
    )
};
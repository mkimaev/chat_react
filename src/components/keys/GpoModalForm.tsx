import { useEffect, useRef } from "react";
import Modal, { ModalHandle } from "../UI/Modal";
import { Button, InputAdornment, TextField } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';

interface FormDialogProps {
    onGetValue: (value: string) => void,
    onDone: () => void;
}

export default function GpoModalForm({ onGetValue, onDone }: FormDialogProps) {
    const modal = useRef<ModalHandle>(null);

    useEffect(() => {   
        if (modal.current) {
            modal.current.open();
        }
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const name = formJson.name;
        const phone = formJson.phone;
        onGetValue(`${name}, ${phone}`);
        // console.log(name, phone); // would normally be sent to a server, together with session data
        onDone();
    }

    return (
        <Modal ref={modal} onClose={onDone}>
            <p>Please enter name and phone your GPO.</p>
            <form onSubmit={handleSubmit}>

                <TextField size='small'
                    required
                    margin="normal"
                    id="name"
                    name="name"
                    label="name"
                    type="text"
                    inputProps={{style: {fontSize: '0.9em'}}} 
                />
                <br />
                <TextField
                    size='small'
                    margin="normal"
                    id="phone"
                    name="phone"
                    label="phone"
                    type="text"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneIcon />
                            </InputAdornment>
                        ),
                        style: {fontSize: '0.9em'}
                    }}
                    
                />
                <p>
                    <Button color='error' variant='outlined' onClick={onDone}>Cancel</Button>

                    <Button
                        style={{ marginLeft: '1em' }}
                        type="submit" variant='contained'>Take</Button>
                </p>
            </form>
        </Modal>
    );
}
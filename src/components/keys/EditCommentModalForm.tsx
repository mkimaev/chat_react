import { useEffect, useRef } from "react";
import Modal, { ModalHandle } from "../UI/Modal";
import { Button, TextField } from "@mui/material";

interface EditCommentModalFormProps {
    onGetValue: (value: string) => void,
    onDone: () => void;
}

export default function EditCommentModalForm({ onGetValue, onDone }: EditCommentModalFormProps) {
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
        const comment = formJson.comment;
        onGetValue(`${comment}`);
        //console.log(comment); // would normally be sent to a server, together with session data
        onDone();
    }

    return (
        <Modal ref={modal} onClose={onDone}>
            <h3>Please enter comment.</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField fullWidth 
                        id='comment'
                        name='comment'
                        label="comment"
                        multiline
                        rows={2}
                        inputProps={{style: {fontSize: '0.8em'}}} 
                    />
                </div>
                <p>
                    <Button color='error' variant='outlined' onClick={onDone}>Cancel</Button>

                    <Button
                        style={{ marginLeft: '1em' }}
                        type="submit" variant='contained'>Change</Button>
                </p>
            </form>
        </Modal>
    );
}
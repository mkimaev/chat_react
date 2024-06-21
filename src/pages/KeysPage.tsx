import { Box, Container, Grid } from "@mui/material";
import KeyDashboard from "../components/keys/KeyDashboard";
import ListKeysComponent from "../components/keys/ListKeysComponent";
import { useState } from "react";
import MyKeysComponent from "../components/keys/MyKeysComponents";


export default function KeysPage() {

    const [mode, setMode] = useState<'main' | 'my-keys'>('main');

    return (
        <Container maxWidth="lg">
            {/* { bgcolor: '#cfe8fc', height: '90vh', }*/}
            <Box sx={{ mt: '85px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <KeyDashboard setMode={setMode} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {mode === 'main' ? <ListKeysComponent /> : <MyKeysComponent />}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

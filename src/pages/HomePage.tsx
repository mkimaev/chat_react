
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

import { Box, Container } from "@mui/material";

export default function HomePage() {

    return (
        <Container maxWidth="lg">
            {/* { bgcolor: '#cfe8fc', height: '90vh', }*/}
            <Box sx={{ mt: '85px' }}>
                <h1><mark>Home page</mark></h1>
            </Box>
        </Container>
        
    );
}
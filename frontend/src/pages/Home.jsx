
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Container style={{ textAlign: 'center', marginTop: '100px' }}>
            <Typography variant="h4" gutterBottom>
                Welcome to Home Page
            </Typography>
            <Button variant="contained" component={Link} to="/login">
                Go to Login
            </Button>
        </Container>
    );
}

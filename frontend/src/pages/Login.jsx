
import { Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Logging in with:', { email, password });

        const apiUrl = import.meta.env.VITE_API_USER;
        console.log("API URL:", apiUrl); // Debugging line to verify URL

        if (!apiUrl) {
            console.error("API URL is undefined. Please check the .env file.");
            setError('API URL is not defined. Please check the .env file.');
            return;
        }

        try {
            const response = await axios.post(apiUrl, { email, password });
            console.log('Login successful:', response.data);
            // Handle successful login, like storing the JWT token in localStorage, redirecting, etc.
        } catch (err) {
            console.error('Login failed:', err.response ? err.response.data : err.message);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '100px' }}>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    style={{ marginTop: '16px' }}
                >
                    Login
                </Button>
            </form>
        </Container>
    );
}

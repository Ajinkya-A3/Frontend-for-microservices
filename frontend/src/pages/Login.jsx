import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../api/index.js';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            const res = await userAPI.post('/login', { email, password });
            localStorage.setItem('token', res.data.token);

            toast.success('Login successful!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    background: '#121212',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    borderRadius: '8px',
                },
                progressStyle: {
                    background: '#00e676'
                },
            });

            setTimeout(() => navigate('/home'), 2500);
        } catch (err) {
            console.error('Login failed:', err);
            toast.error('Login failed! Please check your credentials.', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                style: {
                    background: '#121212',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    borderRadius: '8px',
                },
                progressStyle: {
                    background: '#f44336'
                },
            });
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'url("https://your-image-url.com") no-repeat center center fixed',
                backgroundSize: 'cover',
            }}
        >
            <Container
                maxWidth="xs"
                sx={{
                    padding: 3,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: 3,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom color="primary">Login</Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        error={!!emailError}
                        helperText={emailError}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                        sx={{ marginBottom: 2 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, padding: '10px', fontSize: '16px' }}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>

                    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                            Don't have an account?{' '}
                            <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                Register
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Container>
            <ToastContainer />
        </Box>
    );
}

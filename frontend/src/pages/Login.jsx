import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userAPI } from '../api/index.js';
import {
    TextField,
    Button,
    Typography,
    CircularProgress,
    Box,
    Paper
} from '@mui/material';
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
                position: 'top-right',
                autoClose: 3000,
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
            toast.error('Login failed! Please check your credentials.', {
                position: 'top-right',
                autoClose: 3000,
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
                padding: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 4,
                    padding: { xs: 3, sm: 5 },
                    width: { xs: '100%', sm: 400 },
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" color="primary" gutterBottom fontWeight="bold">
                    Login
                </Typography>

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
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3, py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>

                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
                            Register
                        </Link>
                    </Typography>
                </form>
            </Paper>
            <ToastContainer />
        </Box>
    );
}

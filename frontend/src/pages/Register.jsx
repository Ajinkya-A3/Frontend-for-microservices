import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userAPI } from '../api/index.js';
import {
    Container,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Box,
    Paper
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const navigate = useNavigate();

    const validateName = (name) => {
        const nameRegex = /^[A-Za-z\s]{2,20}$/;
        if (!name) return 'Name is required';
        if (!nameRegex.test(name)) return 'Name should only contain letters and spaces (2-20 characters)';
        return '';
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return '';
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
        if (!password) return 'Password is required';
        if (!passwordRegex.test(password)) return 'Password must be at least 6 characters and contain at least one letter and one number';
        return '';
    };

    const validateForm = () => {
        const emailErr = validateEmail(email);
        const passErr = validatePassword(password);
        const nameErr = validateName(name);

        setEmailError(emailErr);
        setPasswordError(passErr);
        setNameError(nameErr);

        return !emailErr && !passErr && !nameErr;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            const res = await userAPI.post('/register', { name, email, password });

            toast.success('Registration successful! Redirecting to login...', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                style: {
                    background: '#121212',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    borderRadius: '8px',
                },
                progressStyle: {
                    background: '#00e676',
                },
            });

            setTimeout(() => navigate('/'), 2500);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed. Please try again.', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                style: {
                    background: '#121212',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    borderRadius: '8px',
                },
                progressStyle: {
                    background: '#f44336',
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
                    Create Account
                </Typography>

                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!nameError}
                        helperText={nameError}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                    </Button>

                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Already have an account?{' '}
                        <Link to="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
                            Login
                        </Link>
                    </Typography>
                </form>
            </Paper>
            <ToastContainer />
        </Box>
    );
}

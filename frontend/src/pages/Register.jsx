import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userAPI } from '../api/index.js';
import { Container, TextField, Button, Typography, Alert, CircularProgress, Box } from '@mui/material';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const navigate = useNavigate();

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return '';
    };

    // Password validation function
    const validatePassword = (password) => {
        if (!password) return 'Password is required';
        if (password.length < 6) return 'Password must be at least 6 characters long';
        return '';
    };

    // Name validation function
    const validateName = (name) => {
        if (!name) return 'Name is required';
        return '';
    };

    const validateForm = () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const nameError = validateName(name);

        setEmailError(emailError);
        setPasswordError(passwordError);
        setNameError(nameError);

        return !emailError && !passwordError && !nameError;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submitting
        if (!validateForm()) return;

        try {
            setLoading(true);
            const res = await userAPI.post('/register', { name, email, password });
            console.log('Registration success:', res.data);
            // After successful registration, navigate to login
            navigate('/');
        } catch (err) {
            console.error('Registration failed:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                    zIndex: 1,
                }}
            >
                <Typography variant="h4" gutterBottom color="primary">
                    Register
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="current-password"
                        error={!!nameError}
                        helperText={nameError}
                        sx={{ mb: 2 }}
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
                        sx={{ mb: 2 }}
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
                        sx={{ mb: 2 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, padding: '10px', fontSize: '16px' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                    </Button>

                    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                            Already have an account?{' '}
                            <Link to="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Container>
        </Box>
    );
}

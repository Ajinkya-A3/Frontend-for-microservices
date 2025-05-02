import { Box, Container, Grid, Typography, Link, Stack } from '@mui/material';
import { Info, ContactMail } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box
            sx={{
                background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 50%, #00bcd4 100%)',
                color: '#fff',
                py: 5,
                mt: 8,
                borderTop: '4px solid rgba(255,255,255,0.1)',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
                    {/* Branding */}
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                            🛒 KubeCart
                        </Typography>
                        <Typography variant="body1" sx={{ maxWidth: 450 }}>
                            Your one-stop shop for quality products and lightning-fast delivery.
                            Built By using Microservices, Docker, and Kubernetes.
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={5}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Quick Links
                        </Typography>
                        <Stack spacing={1}>
                            <Link href="/about" underline="hover" sx={{ color: '#e3f2fd', display: 'flex', alignItems: 'center' }}>
                                <Info fontSize="small" sx={{ mr: 1 }} />
                                About
                            </Link>
                            <Link href="/contact" underline="hover" sx={{ color: '#e3f2fd', display: 'flex', alignItems: 'center' }}>
                                <ContactMail fontSize="small" sx={{ mr: 1 }} />
                                Contact
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 5, color: '#bbdefb' }}
                >
                    © {new Date().getFullYear()} KubeCart. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}

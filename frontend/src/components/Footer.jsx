import { Box, Container, Grid, Typography, Link } from '@mui/material';

export default function Footer() {
    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                color: '#fff',
                py: 5,
                mt: 6,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            🛒 KubeCart
                        </Typography>
                        <Typography variant="body2" sx={{ maxWidth: 400 }}>
                            Your one-stop shop for quality products and lightning-fast delivery.
                            Built with ❤️ using microservices, Docker, and Kubernetes.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="/about" underline="hover" sx={{ color: '#e3f2fd' }}>
                                About
                            </Link>
                            <Link href="/cart" underline="hover" sx={{ color: '#e3f2fd' }}>
                                Cart
                            </Link>
                            <Link href="/orders" underline="hover" sx={{ color: '#e3f2fd' }}>
                                Orders
                            </Link>
                            <Link href="/contact" underline="hover" sx={{ color: '#e3f2fd' }}>
                                Contact
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 4, color: '#bbdefb' }}
                >
                    © {new Date().getFullYear()} KubeCart. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}

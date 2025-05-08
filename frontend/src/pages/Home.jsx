// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { productAPI } from '../api/index.js';
import { Container, Typography, Box, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SnackbarComponent from '../components/SnackbarComponent.jsx';
import PaginationComponent from '../components/PaginationComponent.jsx';
import SearchSortComponent from '../components/SearchSortComponent.jsx';
import Footer from '../components/Footer';
import axios from 'axios';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    const [cartSuccess, setCartSuccess] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    useEffect(() => {
        fetchProducts();
    }, [searchQuery, sortOrder, page]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productAPI.get(`/?name=${searchQuery}&sortBy=price&order=${sortOrder}&page=${page}`);
            setProducts(response.data.products || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Could not load products.');
        } finally {
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogoutSuccess(true);
        setTimeout(() => navigate('/'), 1500);
    };

    const handleAddToCart = async (product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to add items to your cart.');
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_API_CART}/add`,
                {
                    productId: product._id,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCartSuccess(true);
        } catch (err) {
            console.error('Error adding to cart:', err);
            setError('Failed to add product to cart.');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <Box component="main" sx={{ flexGrow: 1 }}>
                <Container sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Product List
                    </Typography>

                    <SearchSortComponent
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />

                    {error && (
                        <Typography color="error" textAlign="center">
                            {error}
                        </Typography>
                    )}

                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 3,
                                justifyContent: 'center',
                                mt: 4,
                            }}
                        >
                            {[...Array(8)].map((_, index) => (
                                <Skeleton
                                    variant="rectangular"
                                    width={250}
                                    height={350}
                                    key={index}
                                    sx={{ borderRadius: 2 }}
                                />
                            ))}
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 3,
                                justifyContent: 'center',
                                mt: 4,
                            }}
                        >
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        handleAddToCart={handleAddToCart}
                                    />
                                ))
                            ) : (
                                <Typography variant="h6" sx={{ mt: 4 }}>
                                    No products found.
                                </Typography>
                            )}
                        </Box>
                    )}

                    <PaginationComponent count={totalPages} page={page} onPageChange={handlePageChange} />

                    <SnackbarComponent
                        open={logoutSuccess}
                        onClose={() => setLogoutSuccess(false)}
                        severity="success"
                        message="Logged out successfully!"
                    />

                    <SnackbarComponent
                        open={cartSuccess}
                        onClose={() => setCartSuccess(false)}
                        severity="success"
                        message="Product added to cart!"
                        autoHideDuration={1000}
                    />
                </Container>
            </Box>

            <Footer />
        </Box>
    );
}

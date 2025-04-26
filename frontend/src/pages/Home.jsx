// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { productAPI } from '../api/index.js';
import { Container, Typography, Box, Skeleton } from '@mui/material'; // ✅ Import Skeleton here
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SnackbarComponent from '../components/SnackbarComponent.jsx'; // ✅ Importing SnackbarComponent
import PaginationComponent from '../components/PaginationComponent.jsx'; // ✅ Importing PaginationComponent
import SearchSortComponent from '../components/SearchSortComponent.jsx'; // ✅ Importing SearchSortComponent

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

    const handleAddToCart = (product) => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = existingCart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            existingCart[existingProductIndex].quantity += 1;
        } else {
            existingCart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
        setCartSuccess(true);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Navbar />

            <Typography variant="h4" gutterBottom sx={{ mt: 2, textAlign: 'center', fontWeight: 'bold' }}>
                Product List
            </Typography>

            {/* Search and Sort Component */}
            <SearchSortComponent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />

            {/* Error */}
            {error && (
                <Typography color="error" textAlign="center">
                    {error}
                </Typography>
            )}

            {/* Product List */}
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

            {/* Pagination Component */}
            <PaginationComponent count={totalPages} page={page} onPageChange={handlePageChange} />

            {/* Snackbars */}
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
    );
}

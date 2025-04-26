import { useEffect, useState } from 'react';
import { productAPI } from '../api/index.js';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    MenuItem,
    Skeleton,
    Snackbar,
    Alert,
    CardMedia
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import Navbar component

export default function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(true);
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    const [cartSuccess, setCartSuccess] = useState(false);
    const navigate = useNavigate();

    const placeholderImage = 'https://via.placeholder.com/300x200?text=No+Image';

    useEffect(() => {
        fetchProducts();
    }, [searchQuery, sortOrder]);

    const fetchProducts = async () => {
        try {
            const response = await productAPI.get(`/?name=${searchQuery}&sortBy=price&order=${sortOrder}`);
            setProducts(response.data.products || []);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Could not load products.');
        } finally {
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
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
        <div>
            <Navbar /> {/* Add Navbar Component here */}

            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                    Product List
                </Typography>

                <TextField
                    label="Search Products"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <TextField
                    label="Sort By Price"
                    select
                    value={sortOrder}
                    onChange={handleSortChange}
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </TextField>

                {error && <Typography color="error">{error}</Typography>}

                {loading ? (
                    <Grid container spacing={2}>
                        {[...Array(4)].map((_, index) => (
                            <Grid item key={index} xs={12} sm={6}>
                                <Card sx={{ height: 400 }}>
                                    <Skeleton variant="rectangular" height={200} />
                                    <CardContent>
                                        <Skeleton width="60%" />
                                        <Skeleton width="40%" />
                                        <Skeleton width="80%" />
                                        <Skeleton width="50%" />
                                        <Skeleton variant="rectangular" height={36} sx={{ mt: 2 }} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={2}>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                                    <Card sx={{ height: 400, display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            component="img"
                                            image={product.image_url || placeholderImage}
                                            alt={product.name}
                                            sx={{
                                                height: 200,
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" noWrap>{product.name}</Typography>
                                            <Typography variant="body2" color="textSecondary" noWrap>
                                                {product.category}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" noWrap>
                                                {product.description}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                Price: ${product.price}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Stock: {product.stock_quantity}
                                            </Typography>
                                        </CardContent>
                                        <Button
                                            variant="contained"
                                            sx={{ m: 2 }}
                                            onClick={() => handleAddToCart(product)}
                                            disabled={product.stock_quantity === 0}
                                        >
                                            {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                        </Button>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography sx={{ mt: 4, width: '100%', textAlign: 'center' }}>
                                No products found.
                            </Typography>
                        )}
                    </Grid>
                )}

                {/* Add to Cart Snackbar */}
                <Snackbar
                    open={cartSuccess}
                    autoHideDuration={1000}
                    onClose={() => setCartSuccess(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Product added to cart!
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    );
}

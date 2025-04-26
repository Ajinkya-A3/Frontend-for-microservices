import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI } from '../api/index.js';
import Navbar from '../components/Navbar';
import ProductDetailsCard from '../components/ProductDetailsCard';
import CommentsSection from '../components/CommentsSection';
import {
    Container,
    Box,
    CircularProgress,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([
        { id: 1, text: "This is a great product!" }
    ]);
    const [newComment, setNewComment] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productAPI.get(`/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
          const comment = {
            id: comments.length + 1,
            text: newComment,
          };
          setComments([...comments, comment]);
          setNewComment('');
          setOpenSnackbar(true); // <-- this line must run
        }
      };
      

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!product) {
        return (
            <Typography variant="h5" align="center" mt={5}>
                Product not found
            </Typography>
        );
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <ProductDetailsCard product={product} />
                <CommentsSection
                    comments={comments}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    handleAddComment={handleAddComment}
                />
            </Container>

            {/* Snackbar for success message */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"  // << Add this to make it colored and visible
                    sx={{ width: '100%' }}
                >
                    Comment added successfully!
                </Alert>
            </Snackbar>

        </>
    );
}

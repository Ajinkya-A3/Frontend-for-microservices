import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI, reviewAPI } from '../api/index.js';
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
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch product details
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

  // Fetch reviews for the product
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewAPI.get(`/${id}`);
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    fetchReviews();
  }, [id]);

  // Add a new review
  const handleAddComment = async () => {
    if (!newComment.trim() || !rating) return;

    try {
      const token = localStorage.getItem('token');
      const response = await reviewAPI.post(
        '/',
        {
          productId: id,
          reviewText: newComment,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setReviews((prev) => [...prev, response.data]);
      setNewComment('');
      setRating(0);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Error adding review:', err);
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
          comments={reviews}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          rating={rating}
          setRating={setRating}
        />
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: '100%' }}>
          Review added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI, reviewAPI, userAPI } from '../api';
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

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await productAPI.get(`/${id}`);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await reviewAPI.get(`/${id}`);
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    fetchReviews();
  }, [id]);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUserLoading(false);
        return;
      }

      try {
        const { data } = await userAPI.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data?.name) {
          setUser({ name: data.name });
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Handle review submission
  const handleAddComment = async () => {
    if (!newComment.trim() || !rating) return;

    const token = localStorage.getItem('token');
    if (!token || !user?.name) {
      alert('Please log in to submit a review.');
      return;
    }

    try {
      // Add user.name to the comment submission
      const { data } = await reviewAPI.post(
        '/',
        {
          productId: id,
          reviewText: newComment,
          rating,
          userName: user.name, // Use user name here directly
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Check if the comment is added correctly
      console.log('Review added:', data);

      // Update the reviews list immediately with the correct user name
      setReviews((prev) => [{ ...data, userName: user.name }, ...prev]); // Ensuring the correct username here
      setNewComment('');
      setRating(0);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Error adding review:', err);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

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
          isSubmitDisabled={!user || !user.name || !newComment.trim() || !rating || userLoading}
        />
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Review added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

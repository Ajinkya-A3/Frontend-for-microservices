import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Rating,
  Divider,
} from '@mui/material';

const CommentsSection = ({
  comments,
  newComment,
  setNewComment,
  handleAddComment,
  rating,
  setRating,
  isSubmitDisabled,
}) => {
  return (
    <Paper elevation={3} sx={{ mt: 5, p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        Customer Reviews
      </Typography>

      {/* List of Reviews */}
      <List sx={{ mb: 2 }}>
        {comments.map((comment, index) => (
          <Box key={comment._id || comment.id || index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {comment.userName || 'Anonymous'}
                    </Typography>
                    <Rating
                      value={comment.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{ mb: 0.5 }}
                    />
                  </>
                }
                secondary={comment.reviewText}
              />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>

      {/* Add New Review */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Add a review..."
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Rating
          name="user-rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          size="large"
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          disabled={isSubmitDisabled || !newComment.trim() || !rating}
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            px: 4,
            alignSelf: 'flex-start',
            color: 'white',
            background: isSubmitDisabled || !newComment.trim() || !rating
              ? 'gray'
              : 'linear-gradient(90deg, #3f51b5 0%, #2196f3 50%, #00bcd4 100%)',
            backgroundSize: '200%',
            transition: 'all 0.4s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundPosition: 'right',
              background: isSubmitDisabled || !newComment.trim() || !rating
                ? 'gray'
                : 'linear-gradient(90deg, #00bcd4 0%, #2196f3 50%, #3f51b5 100%)',
            },
            '&:disabled': {
              cursor: 'not-allowed',
            },
          }}
        >
          Submit Review
        </Button>

      </Box>
    </Paper>
  );
};

export default CommentsSection;

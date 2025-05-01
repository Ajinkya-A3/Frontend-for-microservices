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
}) => {
  return (
    <Paper elevation={3} sx={{ mt: 5, p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        Customer Reviews
      </Typography>

      {/* List of Reviews */}
      <List sx={{ mb: 2 }}>
        {comments.map((comment) => (
          <Box key={comment._id || comment.id}>
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
          disabled={!newComment.trim() || !rating}
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            px: 4,
            alignSelf: 'flex-start',
          }}
        >
          Submit Review
        </Button>
      </Box>
    </Paper>
  );
};

export default CommentsSection;
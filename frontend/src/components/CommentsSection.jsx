import { Box, Paper, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const CommentsSection = ({ comments, newComment, setNewComment, handleAddComment }) => {
  return (
    <Paper elevation={3} sx={{ mt: 5, p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      <List sx={{ mb: 2 }}>
        {comments.map((comment) => (
          <ListItem key={comment.id} disablePadding>
            <ListItemText primary={comment.text} sx={{ py: 1 }} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <TextField
          fullWidth
          label="Add a comment..."
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          sx={{
            height: { xs: 'auto', sm: '56px' },
            fontWeight: 'bold',
            textTransform: 'none',
            px: 4,
          }}
        >
          Post
        </Button>
      </Box>
    </Paper>
  );
};

export default CommentsSection;

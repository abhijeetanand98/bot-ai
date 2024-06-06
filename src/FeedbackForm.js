import React, { useState } from 'react';
import { Box, Button, TextField, Rating, Typography } from '@mui/material';

const FeedbackForm = ({ onSaveFeedback }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSaveFeedback({ rating, feedback });
  };

  return (
    <Box>
      <Typography variant="h6">Rate the conversation</Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
      />
      <TextField
        fullWidth
        placeholder="Leave your feedback here"
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        multiline
        rows={4}
      />
      <Button onClick={handleSubmit}>Submit Feedback</Button>
    </Box>
  );
};

export default FeedbackForm;

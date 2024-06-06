import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, Select, MenuItem } from '@mui/material';

const FeedbackSummary = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const savedConversations = JSON.parse(localStorage.getItem('conversations')) || [];
    const allFeedbacks = savedConversations.map((conv, index) => ({
      conversation: `Conversation ${index + 1}`,
      rating: conv.feedback.rating,
      feedback: conv.feedback.feedback
    }));
    setFeedbacks(allFeedbacks);
  }, []);

  const filteredFeedbacks = feedbacks.filter(feedback => 
    filter === 'All' || feedback.rating === filter
  );

  return (
    <Box>
      <Typography variant="h6">Feedback Summary</Typography>
      <Select value={filter} onChange={e => setFilter(e.target.value)}>
        <MenuItem value="All">All</MenuItem>
        {[5, 4, 3, 2, 1].map(value => (
          <MenuItem key={value} value={value}>{value} Stars</MenuItem>
        ))}
      </Select>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Conversation</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Feedback</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredFeedbacks.map((feedback, index) => (
            <TableRow key={index}>
              <TableCell>{feedback.conversation}</TableCell>
              <TableCell>{feedback.rating}</TableCell>
              <TableCell>{feedback.feedback}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default FeedbackSummary;

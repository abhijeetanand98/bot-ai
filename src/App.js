import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Button, IconButton, TextField, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Rating, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatHistory from './ChatHistory';

const sampleData = require('./sampledata.json');

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const savedConversations = JSON.parse(localStorage.getItem('conversations')) || [];
    setConversations(savedConversations);
  }, []);

  const saveConversations = (newConversations) => {
    setConversations(newConversations);
    localStorage.setItem('conversations', JSON.stringify(newConversations));
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { type: 'user', text: input };
      const newMessages = [...messages, userMessage];

      const aiResponse = sampleData.find(item => item.question.toLowerCase() === input.toLowerCase());
      const aiMessage = { type: 'ai', text: aiResponse ? aiResponse.response : "I'm sorry, I don't understand." };

      newMessages.push(aiMessage);
      setMessages(newMessages);
      setInput('');
    }
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLikeDislikeClick = (index) => {
    setCurrentMessageIndex(index);
    setFeedbackDialogOpen(true);
  };

  const handleSaveFeedback = () => {
    const newConversations = [...conversations, { messages, feedback: { rating, feedback } }];
    saveConversations(newConversations);
    setMessages([]);
    setRating(0);
    setFeedback('');
    setFeedbackDialogOpen(false);
  };

  const handleDialogClose = () => {
    setFeedbackDialogOpen(false);
    setRating(0);
    setFeedback('');
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Button onClick={handleToggleDarkMode}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </Button>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ position: 'relative', '&:hover .feedback-buttons': { display: 'flex' } }}>
              <ListItemText primary={msg.text} />
              {msg.type === 'ai' && (
                <Box
                  className="feedback-buttons"
                  sx={{
                    display: 'none',
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                  }}
                >
                  <IconButton edge="end" aria-label="thumb up" onClick={() => handleLikeDislikeClick(index)}>
                    <ThumbUpIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="thumb down" onClick={() => handleLikeDislikeClick(index)}>
                    <ThumbDownIcon />
                  </IconButton>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
        <Box component="form" onSubmit={e => e.preventDefault()}>
          <TextField
            fullWidth
            placeholder="Type your message"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <Button onClick={handleSend}>Send</Button>
        </Box>
        <Button onClick={handleSaveFeedback} disabled={!messages.length}>Save Feedback</Button>
        <ChatHistory conversations={conversations} setMessages={setMessages} />
        <Dialog open={feedbackDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Feedback</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Rate the response</Typography>
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
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSaveFeedback}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default App;

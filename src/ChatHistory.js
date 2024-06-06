import React from 'react';
import { Box, List, ListItem, ListItemText, Typography, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';

const ChatHistory = ({ conversations, setMessages }) => {
  const [openConversations, setOpenConversations] = React.useState([]);

  const handleConversationClick = (index) => {
    const newOpenConversations = openConversations.includes(index)
      ? openConversations.filter(i => i !== index)
      : [...openConversations, index];
    setOpenConversations(newOpenConversations);
  };

  return (
    <Box>
      <Typography variant="h6">Past Conversations</Typography>
      <List>
        {conversations.map((conv, index) => (
          <Box key={index}>
            <ListItem button onClick={() => handleConversationClick(index)}>
              <ListItemText primary={`Conversation ${index + 1}`} />
              {openConversations.includes(index) ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openConversations.includes(index)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {conv.messages.map((msg, idx) => (
                  <ListItem key={idx} sx={{ pl: 4 }}>
                    <ListItemText primary={msg.text} />
                  </ListItem>
                ))}
                <ListItem sx={{ pl: 4 }}>
                  <Typography variant="body2">Rating: </Typography>
                  <Rating value={conv.feedback.rating} readOnly />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <Typography variant="body2">Feedback: {conv.feedback.feedback}</Typography>
                </ListItem>
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ChatHistory;

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const [conversation, setConversation] = useState([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);

  const mutation = useMutation({
    mutationFn: async (message) => {
      setIsAITyping(true);
      const response = await axios.post("http://localhost:3000/chat", {
        message,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setIsAITyping(false);
      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "user", content: message },
        { role: "assistant", content: data.response[0].text },
      ]);
      setMessage("");
    },
  });

  const handleSendMessage = () => {
    const currentMessage = message.trim();
    if (!currentMessage) {
      alert("Please enter a message.");
      return;
    }
    mutation.mutate(currentMessage);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        marginTop: 11,
        padding: 5,
        textAlign: "center",
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#333",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ color: darkMode ? "#fff" : "#333" }}>
        AI Chatbot
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginTop: 1,
          marginBottom: 1,
          color: darkMode ? "#ccc" : "#666",
        }}
      >
        Enter your message in the input field below to chat with the AI.
      </Typography>
      <Box
        sx={{
          maxWidth: 600,
          margin: "auto",
          border: darkMode ? "1px solid #666" : "1px solid #ccc",
          borderRadius: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            padding: 2,
            height: 400,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            backgroundColor: darkMode ? "#444" : "#f9f9f9",
          }}
        >
          {conversation.map((entry, index) => (
            <Paper
              key={index}
              sx={{
                padding: 1,
                borderRadius: 4,
                marginBottom: 1,
                alignSelf: entry.role === "user" ? "flex-end" : "flex-start",
                backgroundColor:
                  entry.role === "user"
                    ? darkMode
                      ? "#007bff"
                      : "#007bff"
                    : darkMode
                    ? "#333"
                    : "#f1f1f1",
                color:
                  entry.role === "user" ? "white" : darkMode ? "#fff" : "#333",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  backgroundColor:
                    entry.role === "user"
                      ? darkMode
                        ? "#007bff"
                        : "#007bff"
                      : darkMode
                      ? "#333"
                      : "#f1f1f1",
                  color:
                    entry.role === "user"
                      ? "white"
                      : darkMode
                      ? "#fff"
                      : "#333",
                  marginRight: 1,
                }}
              >
                {entry.role === "user" ? "You:" : <FaRobot />}
              </Avatar>
              <Typography variant="body1">{entry.content}</Typography>
            </Paper>
          ))}
          {isAITyping && (
            <Paper
              sx={{
                padding: 1,
                borderRadius: 1.5,
                marginBottom: 1,
                alignSelf: "flex-start",
                backgroundColor: darkMode ? "#333" : "#f1f1f1",
                color: darkMode ? "#fff" : "#333",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: darkMode ? "#333" : "#f1f1f1",
                  color: darkMode ? "#fff" : "#333",
                  marginRight: 1,
                }}
              >
                <FaRobot />
              </Avatar>
              <Typography variant="body1">
                <CircularProgress size={16} style={{ marginRight: 8 }} />
                AI is typing...
              </Typography>
            </Paper>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: 1,
            backgroundColor: darkMode ? "#333" : "#fff",
            borderTop: darkMode ? "1px solid #666" : "1px solid #ccc",
          }}
        >
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
            variant="outlined"
            size="small"
            sx={{
              flex: 1,
              marginRight: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
                color: darkMode ? "#fff" : "#333",
                backgroundColor: darkMode ? "#222" : "#fff", // Adjusted color for dark mode
              },
              "& .MuiOutlinedInput-input": {
                color: darkMode ? "#fff" : "#333", // Adjusted text color for dark mode
              },
            }}
            onKeyDown={handleKeyDown}
          />
          <IconButton
            onClick={handleSendMessage}
            disabled={mutation.isLoading}
            sx={{
              backgroundColor: darkMode ? "#007bff" : "#007bff",
              color: darkMode ? "#fff" : "white",
              "&:hover": {
                backgroundColor: darkMode ? "#0056b3" : "#0056b3",
              },
            }}
          >
            {mutation.isLoading ? (
              <CircularProgress
                size={24}
                style={{ color: darkMode ? "#fff" : "white" }}
              />
            ) : (
              <IoSend />
            )}
          </IconButton>
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              backgroundColor: darkMode ? "#555" : "#ccc",
              color: darkMode ? "#fff" : "#333",
              marginLeft: 1,
              borderRadius: 4,
              "&:hover": {
                backgroundColor: darkMode ? "#666" : "#ddd",
              },
            }}
          >
            {darkMode ? "Light" : "Dark"} Mode
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot;

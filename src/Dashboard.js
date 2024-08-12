import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "16px",
  maxWidth: "600px",
  margin: "auto",
};

const buttonStyle = {
  marginTop: "16px",
};

const statusStyle = {
  marginTop: "16px",
  color: "red",
};

const Dashboard = ({ setBannerData }) => {
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState(0);
  const [link, setLink] = useState("");
  const [visible, setVisible] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/banner", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setDescription(data.description);
        setTimer(data.timer);
        setLink(data.link);
        setVisible(data.visible);
      } catch (error) {
        console.error("Error fetching banner data:", error);
        setStatusMessage("Error fetching banner data.");
      }
    };
    fetchBanner();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/banner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description, timer, link, visible }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setDescription("");
      setTimer(0);
      setLink("");
      setVisible(true);

      setStatusMessage("Banner updated successfully.");
      setBannerData({ description, timer, link, visible });
    } catch (error) {
      console.error("Error saving banner data:", error);
      setStatusMessage("Error saving banner data.");
    }
  };

  return (
    <Container style={containerStyle}>
      <Typography variant="h6">Edit Banner</Typography>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Timer (seconds)"
        type="number"
        value={timer}
        onChange={(e) => setTimer(Number(e.target.value))}
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <Button
        style={buttonStyle}
        variant="contained"
        color="primary"
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? "Hide Banner" : "Show Banner"}
      </Button>
      <Button
        style={buttonStyle}
        variant="contained"
        color="primary"
        onClick={handleSave}
      >
        Save
      </Button>
      <Typography style={statusStyle}>{statusMessage}</Typography>
    </Container>
  );
};

export default Dashboard;

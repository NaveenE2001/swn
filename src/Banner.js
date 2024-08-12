import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Container } from '@mui/material';

const bannerStyle = {
  padding: '16px',
  marginBottom: '16px',
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const timerStyle = {
  fontSize: '1.2rem',
  margin: '8px 0',
};

const Banner = ({ visible, description, timer, link }) => {
  const [countdown, setCountdown] = useState(timer);

  useEffect(() => {
    setCountdown(timer);

    if (visible && timer > 0) {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else if (!visible) {
      setCountdown(0);
    }

  }, [visible, timer]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  if (!visible || countdown === 0) return null;

  return (
    <Container>
      <Card style={bannerStyle}>
        <Typography variant="h5">{description}</Typography>
        <Typography variant="body1" style={timerStyle}>
          {`Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
        </Typography>
        {link && <Button href={link} target="_blank" rel="noopener noreferrer">Learn More</Button>}
      </Card>
    </Container>
  );
};

export default Banner;

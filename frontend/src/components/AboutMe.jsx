import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutMe() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
          minHeight: '80vh',
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              textAlign: 'center',
              backgroundColor: '#fafafa',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#1e88e5' }}>
              About Me
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#444' }}>
              Hi! I'm a passionate developer who loves building modern web applications using React,
              Node.js, and cloud-native technologies. This e-commerce project demonstrates my
              expertise in microservices, CI/CD, and DevOps tools like Docker, Kubernetes, Jenkins,
              and more.
            </Typography>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

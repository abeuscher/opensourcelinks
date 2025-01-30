import { AccessTime, Update } from '@mui/icons-material';
import { Box, Chip, Container, Divider, Paper, Typography } from '@mui/material';

import React from 'react';

interface GuideLayoutProps {
  content: string;
  metadata: {
    title: string;
    description: string;
    platform: string;
    difficulty: string;
    timeRequired: string;
    lastUpdated: string;
  };
}

const GuideLayout: React.FC<GuideLayoutProps> = ({ content, metadata }) => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {metadata.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {metadata.description}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2, mt: 3 }}>
            <Chip label={`Difficulty: ${metadata.difficulty}`} color="primary" variant="outlined" />
            <Chip
              icon={<AccessTime />}
              label={metadata.timeRequired}
              color="primary"
              variant="outlined"
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            <Update fontSize="small" />
            Last updated: {metadata.lastUpdated}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            '& h1': {
              typography: 'h4',
              mt: 4,
              mb: 2,
              color: 'primary.main',
            },
            '& h2': {
              typography: 'h5',
              mt: 3,
              mb: 2,
              color: 'primary.dark',
            },
            '& p': {
              typography: 'body1',
              mb: 2,
            },
            '& ul, & ol': {
              mb: 2,
              pl: 2,
            },
            '& li': {
              typography: 'body1',
              mb: 1,
            },
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Paper>
    </Container>
  );
};

export default GuideLayout;

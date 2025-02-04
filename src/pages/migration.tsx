import { Box, Container, Link, List, ListItem, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { MigrationData } from '../types/migration';
import { useRouter } from 'next/router';

const MigrationPage = () => {
  const router = useRouter();
  const [data, setData] = useState<MigrationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#data=')) {
        try {
          const encoded = hash.replace('#data=', '');
          const decoded = JSON.parse(atob(encoded));
          setData(decoded);
        } catch (e) {
          setError('Invalid migration link');
        }
      }
    }
  }, []);

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        {data.name && (
          <Typography variant="h5" gutterBottom>
            {data.name}'s New Profiles
          </Typography>
        )}
        <List>
          {data.pairs.map((pair, index) => (
            <ListItem key={index}>
              <Box>
                <Typography variant="subtitle1">{pair.platform}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link href={pair.oldUrl} target="_blank" rel="noopener">
                    Previous Profile
                  </Link>
                  <Link href={pair.newUrl} target="_blank" rel="noopener">
                    New Profile
                  </Link>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default MigrationPage;

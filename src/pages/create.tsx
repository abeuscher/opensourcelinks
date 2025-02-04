import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { MigrationData } from '../types/migration';
import { MigrationForm } from '../components/migration/MigrationForm';
import { MigrationLink } from '../components/migration/MigrationLink';

const CreatePage = () => {
  const [generatedData, setGeneratedData] = useState<MigrationData | null>(null);

  const handleSubmit = (data: MigrationData) => {
    setGeneratedData(data);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Migration Link
      </Typography>
      {!generatedData ? (
        <MigrationForm onSubmit={handleSubmit} />
      ) : (
        <MigrationLink data={generatedData} />
      )}
    </Container>
  );
};

export default CreatePage;

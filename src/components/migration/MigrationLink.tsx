import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { MigrationData } from '../../types/migration';

interface Props {
  data: MigrationData;
}

export const MigrationLink: React.FC<Props> = ({ data }) => {
  const [link, setLink] = useState('');

  useEffect(() => {
    const encoded = btoa(JSON.stringify(data));
    setLink(`${window.location.origin}/migration#data=${encoded}`);
  }, [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Your Migration Link
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <TextField fullWidth value={link} InputProps={{ readOnly: true }} />
        <Button variant="contained" onClick={handleCopy}>
          Copy
        </Button>
      </Box>
    </Paper>
  );
};

export default MigrationLink;

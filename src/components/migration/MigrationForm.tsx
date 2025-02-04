import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { MigrationData, UrlPair } from '../../types/migration';
import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { PlatformUrlPair } from './PlatformUrlPair';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  onSubmit: (data: MigrationData) => void;
}

export const MigrationForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [pairs, setPairs] = useState<UrlPair[]>([
    {
      id: uuidv4(),
      platform: '',
      sourceUrl: '',
      destination: {
        username: '',
        instance: '',
      },
    },
  ]);

  const handleAddPair = () => {
    setPairs([
      ...pairs,
      {
        id: uuidv4(),
        platform: '',
        sourceUrl: '',
        destination: {
          username: '',
          instance: '',
        },
      },
    ]);
  };

  const handleRemovePair = (id: string) => {
    if (pairs.length > 1) {
      setPairs(pairs.filter(pair => pair.id !== id));
    }
  };

  const handlePairChange = (id: string, updates: Partial<UrlPair>) => {
    setPairs(pairs.map(pair => (pair.id === id ? { ...pair, ...updates } : pair)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out incomplete pairs
    const validPairs = pairs.filter(
      pair =>
        pair.platform && pair.sourceUrl && pair.destination.username && pair.destination.instance
    );

    if (validPairs.length > 0) {
      onSubmit({
        name: name || undefined,
        pairs: validPairs,
      });
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create Your Alternative Social Media Links
        </Typography>

        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          {pairs.map((pair, index) => (
            <Box key={pair.id} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box sx={{ flexGrow: 1 }}>
                <PlatformUrlPair
                  pair={pair}
                  onChange={updates => handlePairChange(pair.id, updates)}
                />
              </Box>

              <IconButton
                color="error"
                onClick={() => handleRemovePair(pair.id)}
                disabled={pairs.length === 1}
                data-testid={`remove-button-${index}`}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={handleAddPair}
            variant="outlined"
            fullWidth
            data-testid="add-link-button"
          >
            Add Another Platform
          </Button>

          <Button type="submit" variant="contained" fullWidth data-testid="generate-button">
            Generate Shareable Link
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

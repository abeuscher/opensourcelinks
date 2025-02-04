import { Autocomplete, Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { validateFediverseUsername, validateSourceUrl } from '../../utils/validation';

import type { UrlPair } from '../../types/migration';
import { fediversePlatforms } from '../../data/fediverse';

interface Props {
  pair: UrlPair;
  onChange: (updates: Partial<UrlPair>) => void;
}

export const PlatformUrlPair: React.FC<Props> = ({ pair, onChange }) => {
  const [sourceUrlError, setSourceUrlError] = useState<string>();
  const [usernameError, setUsernameError] = useState<string>();

  const handleSourceUrlChange = (url: string) => {
    const result = validateSourceUrl(pair.platform, url);
    setSourceUrlError(result.message);
    onChange({ sourceUrl: url });
  };

  const handleUsernameChange = (username: string) => {
    const result = validateFediverseUsername(username);
    setUsernameError(result.message);
    onChange({
      destination: { ...pair.destination, username },
    });
  };

  const handleInstanceChange = (instance: string) => {
    onChange({
      destination: { ...pair.destination, instance },
    });
  };

  const platformConfig = fediversePlatforms[pair.platform];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Source URL"
        value={pair.sourceUrl}
        onChange={e => handleSourceUrlChange(e.target.value)}
        error={Boolean(sourceUrlError)}
        helperText={sourceUrlError}
        fullWidth
        data-testid="source-url-input"
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="New Username"
          value={pair.destination.username}
          onChange={e => handleUsernameChange(e.target.value)}
          error={Boolean(usernameError)}
          helperText={usernameError}
          sx={{ flexGrow: 1 }}
          data-testid="destination-username-input"
        />

        <Autocomplete
          options={platformConfig?.defaultInstances || []}
          getOptionLabel={option => option.domain}
          renderInput={params => (
            <TextField
              {...params}
              label="Instance"
              sx={{ minWidth: 200 }}
              data-testid="instance-select"
            />
          )}
          onChange={(_, newValue) => handleInstanceChange(newValue?.domain || '')}
          value={
            platformConfig?.defaultInstances.find(i => i.domain === pair.destination.instance) ||
            null
          }
        />
      </Box>
    </Box>
  );
};

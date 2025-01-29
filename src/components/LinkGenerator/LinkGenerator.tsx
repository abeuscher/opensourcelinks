import { Add as AddIcon, ContentCopy as CopyIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DEFAULT_LINK, PLATFORM_OPTIONS } from '../../utils/constants';
import React, { useCallback, useState } from 'react';

import type { SocialLink } from '../../types';

interface LinkGeneratorProps {
  onGenerate?: (links: SocialLink[]) => void;
  onCopy?: (url: string) => void;
}

const LinkGenerator: React.FC<LinkGeneratorProps> = ({ onGenerate, onCopy }) => {
  const [links, setLinks] = useState<SocialLink[]>([DEFAULT_LINK]);
  const [shareableUrl, setShareableUrl] = useState<string>('');

  const addLink = useCallback(() => {
    setLinks(prevLinks => [...prevLinks, DEFAULT_LINK]);
  }, []);

  const removeLink = useCallback((index: number) => {
    setLinks(prevLinks => prevLinks.filter((_, i) => i !== index));
  }, []);

  const updateLink = useCallback((index: number, field: keyof SocialLink, value: string) => {
    setLinks(prevLinks => {
      const newLinks = [...prevLinks];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return newLinks;
    });
  }, []);

  const generateShareableUrl = useCallback(() => {
    const validLinks = links.filter(link => link.platform && link.url);
    const data = {
      links: validLinks,
      createdAt: new Date().toISOString(),
    };
    const encodedData = btoa(JSON.stringify(data));
    const url = `${window.location.origin}/profile?data=${encodedData}`;
    setShareableUrl(url);
    onGenerate?.(validLinks);
  }, [links, onGenerate]);

  const copyToClipboard = useCallback(() => {
    if (shareableUrl) {
      navigator.clipboard
        .writeText(shareableUrl)
        .then(() => onCopy?.(shareableUrl))
        .catch(console.error);
    }
  }, [shareableUrl, onCopy]);

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Create Your Alternative Social Media Links
          </Typography>

          <Stack spacing={2}>
            {links.map((link, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Select
                  value={link.platform}
                  onChange={(e: SelectChangeEvent) => updateLink(index, 'platform', e.target.value)}
                  sx={{ width: '33%' }}
                  data-testid={`platform-select-${index}`}
                >
                  <MenuItem value="">Select Platform</MenuItem>
                  {PLATFORM_OPTIONS.map(platform => (
                    <MenuItem
                      key={platform.id}
                      value={platform.id}
                      data-testid={`platform-option-${platform.id}`}
                    >
                      {platform.name}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  type="url"
                  placeholder="Your profile URL"
                  value={link.url}
                  onChange={e => updateLink(index, 'url', e.target.value)}
                  fullWidth
                  data-testid={`url-input-${index}`}
                />

                <IconButton
                  color="error"
                  onClick={() => removeLink(index)}
                  disabled={links.length === 1}
                  data-testid={`remove-button-${index}`}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            <Button
              startIcon={<AddIcon />}
              onClick={addLink}
              variant="outlined"
              fullWidth
              data-testid="add-link-button"
            >
              Add Another Platform
            </Button>

            <Button
              onClick={generateShareableUrl}
              variant="contained"
              fullWidth
              data-testid="generate-button"
            >
              Generate Shareable Link
            </Button>

            {shareableUrl && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  value={shareableUrl}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  data-testid="shareable-url-field"
                />
                <IconButton onClick={copyToClipboard} color="primary" data-testid="copy-button">
                  <CopyIcon />
                </IconButton>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LinkGenerator;

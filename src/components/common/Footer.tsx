// src/components/common/Footer.tsx

import { Box, Container, Grid, Typography } from '@mui/material';

import { GitHub } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react';
import { footerNavItems } from '../../data/navigation';
import { siteData } from '@/data/sitedata';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme => theme.palette.primary.light,
        color: theme => theme.palette.primary.contrastText,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" color="text.contrastText" gutterBottom>
              {siteData.title}
            </Typography>
            <Typography variant="h6" color="text.contrastText">
              {siteData.tagline}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
              {footerNavItems.map(item => (
                <Box key={item.url} sx={{ ml: { xs: 0, sm: 2 }, mr: { xs: 2, sm: 0 } }}>
                  {item.url.startsWith('http') ? (
                    <Box
                      component="a"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {item.text === 'GitHub' && <GitHub sx={{ fontSize: 18 }} />}
                      <Typography component="span">{item.text}</Typography>
                    </Box>
                  ) : (
                    <Link href={item.url} passHref legacyBehavior>
                      <Typography
                        component="a"
                        sx={{
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Link>
                  )}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2, color: '#ccc' }}
        >
          {siteData.footer}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

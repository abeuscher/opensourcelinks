import { Box, Button, Container, Typography } from '@mui/material';

import { GetStaticProps } from 'next';
import { loadMarkdownFile } from '../utils/markdownLoader';
import { useRouter } from 'next/router';

interface HomeProps {
  content: string;
  metadata: {
    title: string;
    description: string;
  };
}

export default function Home({ content, metadata }: HomeProps) {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          {metadata.title}
        </Typography>

        <Box
          dangerouslySetInnerHTML={{ __html: content }}
          sx={{
            '& h1': { typography: 'h3', mt: 4, mb: 2 },
            '& h2': { typography: 'h4', mt: 3, mb: 2 },
            '& p': { typography: 'body1', mb: 2 },
            '& ul': { mb: 2, pl: 2 },
            '& li': { typography: 'body1', mb: 1 },
          }}
        />

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" size="large" onClick={() => router.push('/create')}>
            Create Migration Link
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { content, metadata } = await loadMarkdownFile('home');

  return {
    props: {
      content,
      metadata,
    },
  };
};

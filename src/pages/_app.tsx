import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/common/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;

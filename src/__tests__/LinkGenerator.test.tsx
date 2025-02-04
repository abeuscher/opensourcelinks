// src/__tests__/LinkGenerator.test.tsx

import { render, screen, waitFor } from '@testing-library/react';

import LinkGenerator from '../components/LinkGenerator/LinkGenerator';
import userEvent from '@testing-library/user-event';

describe('LinkGenerator', () => {
  const user = userEvent.setup();

  it('validates url format', async () => {
    render(<LinkGenerator />);

    // Fill in an invalid URL
    const urlInput = screen.getByPlaceholderText('Your profile URL');
    await user.type(urlInput, 'not-a-valid-url');

    // Try to generate link
    const generateButton = screen.getByRole('button', { name: /generate/i });
    await user.click(generateButton);

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText(/invalid url format/i)).toBeInTheDocument();
    });
  });

  it('decodes and displays migration data correctly', () => {
    // Create a sample migration with encoded data
    const sampleData = {
      platform: 'facebook',
      oldUrl: 'https://facebook.com/oldprofile',
      newUrl: '@newprofile@mastodon.social',
    };
    const encodedData = btoa(JSON.stringify(sampleData));
    const url = `?data=${encodedData}`;

    // Mock the URL for testing
    delete (window as any).location;
    window.location = new URL(`http://localhost${url}`) as any;

    render(<LinkGenerator />);

    // Verify the decoded data is displayed
    expect(screen.getByText(sampleData.oldUrl)).toBeInTheDocument();
    expect(screen.getByText(sampleData.newUrl)).toBeInTheDocument();
  });
});

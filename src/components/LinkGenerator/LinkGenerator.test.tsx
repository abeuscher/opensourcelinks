import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import LinkGenerator from './LinkGenerator';
import { PLATFORM_OPTIONS } from '../../utils/constants';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('LinkGenerator', () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it('renders initial state correctly', () => {
    renderWithTheme(<LinkGenerator />);

    expect(screen.getByText('Create Your Alternative Social Media Links')).toBeInTheDocument();
    expect(screen.getByTestId('platform-select-0')).toBeInTheDocument();
    expect(screen.getByTestId('url-input-0')).toBeInTheDocument();
    expect(screen.getByTestId('add-link-button')).toBeInTheDocument();
  });

  it('adds new link input when Add button is clicked', () => {
    renderWithTheme(<LinkGenerator />);

    fireEvent.click(screen.getByTestId('add-link-button'));

    expect(screen.getByTestId('platform-select-1')).toBeInTheDocument();
    expect(screen.getByTestId('url-input-1')).toBeInTheDocument();
  });

  it('removes link input when remove button is clicked', () => {
    renderWithTheme(<LinkGenerator />);

    // Add a new link first
    fireEvent.click(screen.getByTestId('add-link-button'));
    expect(screen.getByTestId('platform-select-1')).toBeInTheDocument();

    // Remove the second link
    fireEvent.click(screen.getByTestId('remove-button-1'));
    expect(screen.queryByTestId('platform-select-1')).not.toBeInTheDocument();
  });

  it('generates shareable URL with valid links', async () => {
    const onGenerate = jest.fn();
    renderWithTheme(<LinkGenerator onGenerate={onGenerate} />);

    // Fill in the form
    fireEvent.change(screen.getByTestId('platform-select-0'), {
      target: { value: PLATFORM_OPTIONS[0].id },
    });

    fireEvent.change(screen.getByTestId('url-input-0'), {
      target: { value: 'https://example.com/profile' },
    });

    // Generate URL
    fireEvent.click(screen.getByTestId('generate-button'));

    // Check if shareable URL field appears
    expect(screen.getByTestId('shareable-url-field')).toBeInTheDocument();

    // Verify onGenerate was called with correct data
    expect(onGenerate).toHaveBeenCalledWith([
      {
        platform: PLATFORM_OPTIONS[0].id,
        url: 'https://example.com/profile',
      },
    ]);
  });

  it('copies URL to clipboard when copy button is clicked', async () => {
    const onCopy = jest.fn();
    renderWithTheme(<LinkGenerator onCopy={onCopy} />);

    // Generate a shareable URL first
    fireEvent.change(screen.getByTestId('platform-select-0'), {
      target: { value: PLATFORM_OPTIONS[0].id },
    });
    fireEvent.change(screen.getByTestId('url-input-0'), {
      target: { value: 'https://example.com/profile' },
    });
    fireEvent.click(screen.getByTestId('generate-button'));

    // Click copy button
    fireEvent.click(screen.getByTestId('copy-button'));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
      expect(onCopy).toHaveBeenCalled();
    });
  });
});

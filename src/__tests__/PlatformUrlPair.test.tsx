import { fireEvent, render, screen } from '@testing-library/react';

import { PlatformUrlPair } from '../components/migration/PlatformUrlPair';

describe('PlatformUrlPair Component', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    pair: {
      platform: 'facebook',
      sourceUrl: '',
      destination: {
        username: '',
        instance: '',
      },
    },
    onChange: mockOnChange,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders form fields', () => {
    render(<PlatformUrlPair {...defaultProps} />);
    expect(screen.getByLabelText(/source url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/instance/i)).toBeInTheDocument();
  });

  test('handles source URL changes', () => {
    render(<PlatformUrlPair {...defaultProps} />);
    const input = screen.getByLabelText(/source url/i);
    fireEvent.change(input, { target: { value: 'https://facebook.com/username' } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});

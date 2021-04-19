import React from 'react';
import {render, waitFor} from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue(true);
});

afterEach(() => {
  global.fetch = jest.fn();
});

test('should display github status', async () => {
  const {getByTestId} = render(<App />);
  await waitFor(() => getByTestId('status'));
  expect(getByTestId('status')).toBeInTheDocument();
});

test('should display github status time', async () => {
  global.fetch = jest.fn().mockRejectedValue(false);
  const {getByTestId} = render(<App />);
  await waitFor(() => getByTestId('status-time'));
  expect(getByTestId('status-time')).toBeInTheDocument();
});

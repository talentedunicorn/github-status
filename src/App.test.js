import React from 'react';
import {render, waitForElement} from '@testing-library/react';
import App from './App';

afterEach(() => {
  global.fetch = jest.fn();
});

test('should display github status', async () => {
  global.fetch = () => Promise.resolve({status: 200, text: 'up'});
  const {getByTestId, getByText} = await waitForElement(() => render(<App />));
  expect(getByTestId('status')).toBeInTheDocument();
});

test('should display github status time', async () => {
  global.fetch = () => Promise.reject({status: 400, text: 'down'});
  const {getByTestId} = await waitForElement(() => render(<App />));
  expect(getByTestId('status-time')).toBeInTheDocument();
});

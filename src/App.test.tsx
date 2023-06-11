import React from 'react';
import {fireEvent, getByPlaceholderText, render, screen} from '@testing-library/react';
import App from './App';

test('render', () => {
  render(<App />);
  const linkElement = screen.getByText(/items left/);
  expect(linkElement).toBeInTheDocument();
});


test('addTodo', () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const input = getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  expect(getByText('New Todo')).toBeInTheDocument();
});

test('checkbox state changes on click', () => {
  const { getByText, getByTestId,getByPlaceholderText } = render(<App />);
  const todoText = 'Example Todo';

  const input:HTMLElement = getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, { target: { value: todoText } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  const todoItem = getByText(todoText);

  const checkbox = getByTestId('checkbox') as HTMLInputElement
  expect(checkbox.checked).toBe(false);

  fireEvent.click(todoItem);
  expect(checkbox.checked).toBe(true);
});

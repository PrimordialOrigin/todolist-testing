import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import fetchMock from 'jest-fetch-mock';
import mockData from './mockData';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce(JSON.stringify(mockData)); // Mock initial fetch data
});

describe("<App /> tests", () => {
  it("should render <App /> component", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    expect(screen.getByText(/My Todo List/i)).toBeInTheDocument();
  });

  it("should add a todo item", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      userId: 3,
      id: Math.floor(Math.random() * 10000) + 1,
      title: 'Do math homework',
      completed: false
    }));

    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    userEvent.type(screen.getByRole("textbox"), 'Do math homework');
    userEvent.click(screen.getByText(/Add new todo/i));

    // Use findBy to ensure the element appears first
    await screen.findByText(/saving/i); // Wait for 'saving' to be visible if needed
    await waitForElementToBeRemoved(() => screen.queryByText(/saving/i));
    
    expect(await screen.findByText(/Do math homework/i)).toBeInTheDocument();
  });

  it("should remove a todo from the list", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    userEvent.click(screen.getByTestId('close-btn-3'));

    // Wait for the todo item to be removed
    await waitFor(() => expect(screen.queryByText(/Take out the trash/i)).not.toBeInTheDocument());
  });

  it("todo item should be crossed out after completing", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    // Ensure the item is initially present and not completed
    const todoItem = screen.getByText(/Eat breakfast/i);
    expect(todoItem).not.toHaveClass('completed');

    // Click the checkbox to complete the todo item
    userEvent.click(screen.getByTestId('checkbox-1'));

    // Wait for the updated item to be present with the 'completed' class
    const updatedTodoItem = await waitFor(() => screen.findByText(/Eat breakfast/i));
    expect(updatedTodoItem).toHaveClass('completed');
  });
});

// import React from "react";
// import "@testing-library/jest-dom";
// import { render, screen } from "@testing-library/react";
// import TodoItem from './TodoItem';
// import mockData from '../../mockData';

// describe('<TodoItem /> tests', () => {
//   it("should render todo item with close button.", () => {
//     render(<TodoItem todo={mockData[0]} />);
//     expect(screen.queryByText(/eat breakfast/i)).toBeInTheDocument();
//     expect(screen.getByTestId('close-btn-1')).toBeInTheDocument();
//   });
  
//   it("should render todo item with checkbox.", () => {
//     render(<TodoItem todo={mockData[0]} />);
//     expect(screen.getByTestId('checkbox-1')).toBeInTheDocument();
//     expect(screen.queryByText(/eat breakfast/i)).toBeInTheDocument();
//   });
// })

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from './TodoItem';
import mockData from '../../mockData';

describe('<TodoItem /> tests', () => {
  const mockTodo = mockData[0];

  it("should render todo item with close button and checkbox.", () => {
    render(<TodoItem todo={mockTodo} removeHandler={() => {}} updateTodo={() => {}} editTodo={() => {}} />);
    expect(screen.queryByText(/eat breakfast/i)).toBeInTheDocument();
    expect(screen.getByTestId('close-btn-1')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-1')).toBeInTheDocument();
  });

  it("should call updateTodo when checkbox is clicked.", () => {
    const updateTodo = jest.fn();
    render(<TodoItem todo={mockTodo} removeHandler={() => {}} updateTodo={updateTodo} editTodo={() => {}} />);

    fireEvent.click(screen.getByTestId('checkbox-1'));
    expect(updateTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  it("should call removeHandler when close button is clicked.", () => {
    const removeHandler = jest.fn();
    render(<TodoItem todo={mockTodo} removeHandler={removeHandler} updateTodo={() => {}} editTodo={() => {}} />);

    fireEvent.click(screen.getByTestId('close-btn-1'));
    expect(removeHandler).toHaveBeenCalledWith(mockTodo.id);
  });

  it("should have completed class if todo is completed.", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} removeHandler={() => {}} updateTodo={() => {}} editTodo={() => {}} />);

    expect(screen.getByText(/eat breakfast/i)).toHaveClass('completed');
  });

  it("should show edit and save buttons correctly", () => {
    const editTodo = jest.fn();
    render(<TodoItem todo={mockTodo} removeHandler={() => {}} updateTodo={() => {}} editTodo={editTodo} />);

    
    fireEvent.click(screen.getByTestId(`edit-btn-${mockTodo.id}`));
    expect(screen.getByTestId(`save-btn-${mockTodo.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`cancel-btn-${mockTodo.id}`)).toBeInTheDocument();


    fireEvent.change(screen.getByDisplayValue(mockTodo.title), { target: { value: 'Do math homework' } });
    fireEvent.click(screen.getByTestId(`save-btn-${mockTodo.id}`));
    expect(editTodo).toHaveBeenCalledWith(mockTodo.id, 'Do math homework');
  });
});

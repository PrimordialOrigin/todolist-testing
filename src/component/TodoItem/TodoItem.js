import React, { useState } from 'react';
import styles from './TodoItem.module.css';

const TodoItem = ({ todo, removeHandler, updateTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    if (isEditing) {
      editTodo(todo.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.itemContainer}>
      <div>
        <input 
          type='checkbox' 
          checked={todo.completed} 
          data-testid={`checkbox-${todo.id}`} 
          onChange={() => updateTodo(todo.id)} 
        />
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <label 
            htmlFor={`checkbox-${todo.id}`}
            className={todo.completed ? styles.completed : ''} 
          >
            {todo.title}
          </label>
        )}
      </div>
      <div className={styles.buttons}>
        <button className={styles.closeBtn} data-testid={`close-btn-${todo.id}`} onClick={() => removeHandler(todo.id)}>X</button>
        <button className={styles.editBtn} onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      </div>
    </div>
  );
};

export default TodoItem;

import React from 'react';
import { BiMessageAdd } from 'react-icons/bi';
import styles from './toDo.module.scss';

interface Props {
  text: string;
  handleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
}

const TaskField = ({ text, handleKeyUp, handleInputChange, addTask }: Props) => {
  return (
    <div className={styles.addField} >
      <input
        type="text"
        placeholder="Enter the task text..."
        className={styles.addInput}
        value={text}
        onKeyUp={handleKeyUp}
        onChange={handleInputChange}
        data-testid="input"
      />
      <button onClick={addTask} className={styles.btn} >
        <BiMessageAdd className={styles.btnImg} />
      </button>
    </div>
  );
};

export default React.memo(TaskField);

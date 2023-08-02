import cn from 'classnames';
import React from 'react';
import { MdDeleteOutline, MdOutlineDoneOutline } from 'react-icons/md';
import styles from './toDoList.module.scss';

interface Props {
  text: string;
  id: string | undefined;
  completed: boolean;
  toggleCompleted: (id: string | undefined, completed: boolean) => void;
  removeTask: (id: string | undefined) => void;
}

const ToDoList = ({ text, completed, id, toggleCompleted, removeTask }: Props) => {
  const linkStyles = cn(styles.listItem, { [styles.listItemComplit]: completed });
  const complStyles = cn(styles.itemCheck, { [styles.itemCheckCompl]: !completed });

  return (
    <div className={linkStyles}>
      <div className={styles.compliteGroup}>
        <div onClick={() => toggleCompleted(id, completed)} className={complStyles} data-testid="completed-button">
          <MdOutlineDoneOutline className={styles.btnImg} />
        </div>
        <p className={styles.tasksText}>{text}</p>
      </div>
      <div onClick={() => removeTask(id)} className={styles.itemRemove}>
        <MdDeleteOutline className={styles.btnImg} />
      </div>
    </div>
  );
};

export default React.memo(ToDoList);

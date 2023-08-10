import cn from 'classnames';
import React from 'react';
import { MdDeleteOutline, MdOutlineDoneOutline } from 'react-icons/md';
import styles from './ToDo.module.scss';

interface Props {
  text: string;
  index: number;
  completed: boolean;
  toggleCompleted: (index: number) => void;
  removeTask: (index: number) => void;
}

const ListItem = ({ text, index, completed, toggleCompleted, removeTask }: Props) => {
  const linkStyles = cn(styles.listItem, { [styles.listItemComplit]: completed });
  const complStyles = cn(styles.itemCheck, { [styles.itemCheckCompl]: !completed });

  return (
    <div className={linkStyles}>
      <div className={styles.compliteGroup}>
        <div onClick={() => toggleCompleted(index)} className={complStyles}>
          <MdOutlineDoneOutline className={styles.btnImg} />
        </div>
        <p className={styles.tasksText}>{text}</p>
      </div>
      <div onClick={() => removeTask(index)} className={styles.itemRemove}>
        <MdDeleteOutline className={styles.btnImg} />
      </div>
    </div>
  );
};

export default React.memo(ListItem);

import cn from 'classnames';
import React from 'react';
import { MdDeleteOutline, MdOutlineDoneOutline } from 'react-icons/md';
import styles from './ToDo.module.scss';

interface Props {
  text: string;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main
  id: string | undefined;
  completed: boolean;
  toggleCompleted: (id: string | undefined, completed: boolean) => void;
  removeTask: (id: string | undefined) => void;
}

const ListItem = ({ text, completed, id, toggleCompleted, removeTask }: Props) => {
<<<<<<< HEAD
=======
  index: number;
=======
  id: string | undefined;
>>>>>>> 590496a (todo on server)
  completed: boolean;
  toggleCompleted: (id: string | undefined, completed: boolean) => void;
  removeTask: (id: string | undefined) => void;
}

<<<<<<< HEAD
const ListItem = ({ text, index, completed, toggleCompleted, removeTask }: Props) => {
>>>>>>> 8673b67 (add server and start auth)
=======
const ListItem = ({ text, completed, id, toggleCompleted, removeTask }: Props) => {
>>>>>>> 590496a (todo on server)
=======
>>>>>>> main
  const linkStyles = cn(styles.listItem, { [styles.listItemComplit]: completed });
  const complStyles = cn(styles.itemCheck, { [styles.itemCheckCompl]: !completed });

  return (
    <div className={linkStyles}>
      <div className={styles.compliteGroup}>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <div onClick={() => toggleCompleted(id, completed)} className={complStyles}>
=======
        <div onClick={() => toggleCompleted(index)} className={complStyles}>
>>>>>>> 8673b67 (add server and start auth)
=======
        <div onClick={() => toggleCompleted(id, completed)} className={complStyles}>
>>>>>>> 590496a (todo on server)
=======
        <div onClick={() => toggleCompleted(id, completed)} className={complStyles}>
>>>>>>> main
          <MdOutlineDoneOutline className={styles.btnImg} />
        </div>
        <p className={styles.tasksText}>{text}</p>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      <div onClick={() => removeTask(id)} className={styles.itemRemove}>
=======
      <div onClick={() => removeTask(index)} className={styles.itemRemove}>
>>>>>>> 8673b67 (add server and start auth)
=======
      <div onClick={() => removeTask(id)} className={styles.itemRemove}>
>>>>>>> 590496a (todo on server)
=======
      <div onClick={() => removeTask(id)} className={styles.itemRemove}>
>>>>>>> main
        <MdDeleteOutline className={styles.btnImg} />
      </div>
    </div>
  );
};

export default React.memo(ListItem);

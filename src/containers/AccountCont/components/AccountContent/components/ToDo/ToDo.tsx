import React, { useCallback, useState } from 'react';
import ListItem from './ListItem';
import TaskField from './TaskField';
import styles from './ToDo.module.scss';

const tasksData = [
  { text: 'Find a striker', completed: true },
  { text: "Extend Drogba's contract", completed: false },
];

const ToDo = () => {
  const [tasks, setTasks] = useState([...tasksData]);
  const [text, setText] = useState('');

  const onToggleCompleted = useCallback(
    (index: number) => {
      setTasks((prevTasks) =>
        prevTasks.map((task, curIdx) => (index === curIdx ? { ...task, completed: !task.completed } : task)),
      );
    },
    [setTasks],
  );

  const onRemoveTask = useCallback(
    (index: number) => {
      setTasks((prevTasks) => prevTasks.filter((_, curIdx) => index !== curIdx));
    },
    [setTasks],
  );

  const onAddTask = useCallback(
    (text: string) => {
      setTasks((prevTasks) => [...prevTasks, { text, completed: false }]);
    },
    [setTasks],
  );

  // field //

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setText(value);
  }, []);

  const addTask = useCallback(() => {
    if (text) {
      onAddTask(text);
      setText('');
    }
  }, [onAddTask, text]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        addTask();
      }
    },
    [addTask],
  );

  // list //

  const toggleCompleted = useCallback(
    (index: number) => {
      onToggleCompleted(index);
    },
    [onToggleCompleted],
  );

  const removeTask = useCallback(
    (index: number) => {
      onRemoveTask(index);
    },
    [onRemoveTask],
  );

  return (
    <section className={styles.todo}>
      <div className={styles.container}>
        <h4 className={styles.text}>Tasks list</h4>
        <TaskField text={text} handleInputChange={handleInputChange} addTask={addTask} handleKeyUp={handleKeyUp} />
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            index={index}
            completed={task.completed}
            text={task.text}
            toggleCompleted={toggleCompleted}
            removeTask={removeTask}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(ToDo);

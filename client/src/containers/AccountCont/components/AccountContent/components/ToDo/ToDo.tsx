<<<<<<< HEAD
import { ITasks } from '@/interfaces';
import { tasksAPI } from '@/store/services/TasksService';
=======
>>>>>>> 8673b67 (add server and start auth)
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListItem from './ListItem';
import TaskField from './TaskField';
import styles from './ToDo.module.scss';

<<<<<<< HEAD
const ToDo = () => {
  const { data: tasks } = tasksAPI.useGetTasksQuery();
  const [createTasks] = tasksAPI.useCreateTasksMutation();
  const [deleteTasks] = tasksAPI.useDeleteTasksMutation();
  const [completedTasks] = tasksAPI.useCompletedTasksMutation();
  const [text, setText] = useState('');
  const { t } = useTranslation();

=======
const tasksData = [
  { text: 'Find a striker', completed: true },
  { text: "Extend Drogba's contract", completed: false },
];

const ToDo = () => {
  const [tasks, setTasks] = useState([...tasksData]);
  const [text, setText] = useState('');
  const { t } = useTranslation();

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

>>>>>>> 8673b67 (add server and start auth)
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setText(value);
  }, []);

<<<<<<< HEAD
  const onAddTask = async (values: ITasks) => {
    await createTasks({
      text: values.text,
      completed: false,
    });
    setText('');
  };

  const addTask = useCallback(() => {
    if (text) {
      onAddTask({ text, completed: false });
=======
  const addTask = useCallback(() => {
    if (text) {
      onAddTask(text);
>>>>>>> 8673b67 (add server and start auth)
      setText('');
    }
  }, [onAddTask, text]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        addTask();
      }
    },
<<<<<<< HEAD
    [addTask]
  );

  const onRemoveTask = async (taskId: string) => {
    try {
      await deleteTasks({ _id: taskId });
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const removeTask = useCallback(
    (id: string | undefined) => {
      if (id !== undefined) {
        onRemoveTask(id);
      }
    },
    [onRemoveTask]
  );

  const onToggleCompleted = async (taskId: string, completed: boolean) => {
    try {
      await completedTasks({ _id: taskId, completed: completed });
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const toggleCompleted = useCallback(
    (id: string | undefined, completed: boolean) => {
      if (id !== undefined) {
        onToggleCompleted(id, completed);
      }
    },
    [onToggleCompleted]
=======
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
>>>>>>> 8673b67 (add server and start auth)
  );

  return (
    <section className={styles.todo}>
      <div className={styles.container}>
        <h4 className={styles.text}>{t('Tasks list')}</h4>
        <TaskField text={text} handleInputChange={handleInputChange} addTask={addTask} handleKeyUp={handleKeyUp} />
<<<<<<< HEAD
        {tasks?.map(task => (
          <ListItem
            key={task._id}
            id={task._id}
=======
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            index={index}
>>>>>>> 8673b67 (add server and start auth)
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

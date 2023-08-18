import { ITasks } from '@/interfaces';
import { tasksAPI } from '@/store/services/TasksService';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListItem from './ListItem';
import TaskField from './TaskField';
import styles from './ToDo.module.scss';

const ToDo = () => {
  const { data: tasks } = tasksAPI.useGetTasksQuery();
  const [createTasks] = tasksAPI.useCreateTasksMutation();
  const [deleteTasks] = tasksAPI.useDeleteTasksMutation();
  const [completedTasks] = tasksAPI.useCompletedTasksMutation();
  const [text, setText] = useState('');
  const { t } = useTranslation();

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setText(value);
  }, []);

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
      setText('');
    }
  }, [onAddTask, text]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        addTask();
      }
    },
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
  );

  return (
    <section className={styles.todo}>
      <div className={styles.container}>
        <h4 className={styles.text}>{t('Tasks list')}</h4>
        <TaskField text={text} handleInputChange={handleInputChange} addTask={addTask} handleKeyUp={handleKeyUp} />
        {tasks?.map(task => (
          <ListItem
            key={task._id}
            id={task._id}
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

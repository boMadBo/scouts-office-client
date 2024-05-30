import { ICreateTask } from '@/containers/account/types';
import { taskAPI } from '@/store/services/TaskService';
import Task from '@/uikit/Task';
import TaskForm from '@/uikit/forms/TaskForm';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './tasks.module.scss';

const Tasks = () => {
  const { data: tasks } = taskAPI.useGetTasksQuery();
  const [createTask] = taskAPI.useCreateTaskMutation();
  const [deleteTask] = taskAPI.useDeleteTaskMutation();
  const [completeTask] = taskAPI.useUpdateTaskMutation();
  const [text, setText] = useState('');
  const { t } = useTranslation();

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setText(value);
  }, []);

  const onAddTask = async (values: ICreateTask) => {
    await createTask({
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
      await deleteTask({ id: taskId });
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
      await completeTask({ id: taskId, completed: completed });
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const toggleCompleted = useCallback(
    (completed: boolean, id: string | undefined) => {
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
        <TaskForm text={text} handleInputChange={handleInputChange} addTask={addTask} handleKeyUp={handleKeyUp} />
        {tasks?.map(task => (
          <Task
            key={task.id}
            id={task.id.toString()}
            completed={task.completed}
            text={task.text}
            toggleCompleted={(completed: boolean) => toggleCompleted(completed, task.id.toString())}
            removeTask={() => removeTask(task.id.toString())}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(Tasks);

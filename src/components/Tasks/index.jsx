import React from 'react';
import axios from 'axios';
import editSvg from '../../assets/img/edit.svg';
import AddTaskForm from './AddTaskForm';
import Task from './Task';
import './Tasks.scss';

const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, withoutEmpty, onEditTask }) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if(newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle
        }).catch(() => {
          alert('не удалось обновить название списка')
      });
    }
  }
/*
  const onRemove = (taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      axios
      .delete('http://localhost:3001/tasks/' + taskId)
      .catch(() => {
        alert('не удалось удалить задачу')
    });
    }
  }
*/
  return (
    <div className="tasks">
      <h2 style = {{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img onClick = {editTitle} src={editSvg} alt="Edit icon" />
      </h2>

      <div className="tasks__items">
        {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks.map(task => (
          <Task key={task.id} list = {list} onEdit = {onEditTask} onRemove = {onRemoveTask} {...task}/>
        ))}
        <AddTaskForm key = {list.id} list = {list} onAddTask = {onAddTask}/>
      </div>
    </div>
  );
};

export default Tasks;
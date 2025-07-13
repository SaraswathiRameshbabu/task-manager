import { useEffect, useState } from 'react';
import axios from '../api/axios';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const fetchTasks = async () => {
    const res = await axios.get('/tasks');
    setTasks(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post('/tasks', newTask);
    setNewTask({ title: '', description: '' });
    fetchTasks();
  };

  const handleToggle = async (id, completed) => {
    await axios.put(`/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <form onSubmit={handleCreate} className="space-y-2">
        <input
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full p-2 border"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full p-2 border"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Add Task</button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-2">My Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="p-4 border rounded mb-2">
              <h3 className={`font-semibold ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
              <p>{task.description}</p>
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => handleToggle(task._id, task.completed)}
                  className="bg-yellow-500 text-white px-3 py-1"
                >
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-600 text-white px-3 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;

import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
    </form>
  );
}

export default Login;

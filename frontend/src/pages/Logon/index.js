import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      console.log(response.data.name);
      history.push('/profile');

    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleRegister}>
          <h1>Login</h1>

          <input placeholder="Enter your ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Enter</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041" />
            Register
          </Link>

        </form>

      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
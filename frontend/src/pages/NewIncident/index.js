import React, { useState } from 'react';
import './styles.css'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowDownLeft } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem('ongId')

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })
      history.push('/profile');
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Add new Issue</h1>
          <p>Detail the issue to find a hero for solving it.</p>

          <Link to="/profile" className="back-link">
            <FiArrowDownLeft size={16} color="#E02041" />
            Register
          </Link>
        </section>
        <form action="">
          <input placeholder="Issue Name"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input placeholder="Donation in $"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button onClick={handleRegister} className="button">Add</button>
        </form>
      </div>
    </div>
  );
}
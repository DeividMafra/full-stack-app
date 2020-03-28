import React, { useState, useEffect } from 'react';
import './styles.css'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');


  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      // to update the DOM in real time
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert(error)
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Welcome, {ongName}!</span>

        <Link to="/incidents/new" className="button">New Issue</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Issues List</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Issue:</strong>
            <p>{incident.title}</p>
            <strong>Description:</strong>
            <p>{incident.description}</p>
            <strong>Value:</strong>
            <p>{Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>

          </li>
        ))}

      </ul>
    </div>
  );
}
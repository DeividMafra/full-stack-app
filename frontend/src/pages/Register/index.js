import React, { useState } from 'react';
import './styles.css'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data);

      alert(`It's your access ID: ${response.data.id}`);
      history.push('/');
    } catch (error) {
      alert(error)

    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Register</h1>
          <p>Register and help people find you to solve your issue.</p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Register
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Organization Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input type="email" placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input placeholder="UF" style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Register</button>
        </form>

      </div>
    </div>
  );
}
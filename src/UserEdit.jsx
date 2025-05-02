import React, { useState } from 'react';
import UserService from './services/User';

const UserEdit = ({ user, setMuokkaustila, setIsPositive, setMessage, setShowMessage, reloadNow }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [accesslevelId, setAccesslevelId] = useState(user.accesslevelId);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
      accesslevelId,
    };

    UserService
      .update(user.userId, updatedUser)
      .then(() => {
        setIsPositive(true);
        setMessage('Käyttäjän tiedot päivitetty onnistuneesti');
        setShowMessage(true);
        setMuokkaustila(false);
        reloadNow(prev => !prev);
      })
      .catch(() => {
        setIsPositive(false);
        setMessage('Käyttäjän päivittäminen epäonnistui');
        setShowMessage(true);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Muokkaa käyttäjää</h2>

      <div>
        <label>Etunimi</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>

      <div>
        <label>Sukunimi</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>

      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div>
        <label>Accesslevel ID</label>
        <input type="number" value={accesslevelId} onChange={(e) => setAccesslevelId(Number(e.target.value))} required />
      </div>

      <button type="submit">Tallenna</button>
      <button type="button" onClick={() => setMuokkaustila(false)}>Peruuta</button>
    </form>
  );
};

export default UserEdit;

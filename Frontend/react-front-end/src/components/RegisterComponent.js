import React, { useState } from 'react';
import { registerAccount } from '../services/AccountService';
import './FormStyles.css';


function RegisterComponent() {
  const [account, setAccount] = useState({
    accountNo: '',
    name: '',
    IFSC: '',
    balance: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAccount(account);
      alert('Account registered successfully');
    } catch (error) {
      alert('Failed to register account');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Account Number:</label>
          <input
            name="accountNo"
            type="text"
            value={account.accountNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            name="name"
            type="text"
            value={account.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>IFSC Code:</label>
          <input
            name="IFSC"
            type="text"
            value={account.IFSC}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Initial Balance:</label>
          <input
            name="balance"
            type="number"
            value={account.balance}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterComponent;

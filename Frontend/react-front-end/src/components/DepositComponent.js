import React, { useState } from 'react';
import { deposit } from '../services/AccountService';
import './FormStyles.css';
function DepositComponent() {
  const [depositInfo, setDepositInfo] = useState({
    accountNo: '',
    IFSC: '',
    amount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepositInfo({ ...depositInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deposit(depositInfo.accountNo, depositInfo.IFSC, depositInfo.amount);
      alert('Deposit successful');
    } catch (error) {
      alert('Failed to deposit');
      console.error('Deposit error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Deposit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Account Number:</label>
          <input
            name="accountNo"
            type="text"
            value={depositInfo.accountNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>IFSC Code:</label>
          <input
            name="IFSC"
            type="text"
            value={depositInfo.IFSC}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            name="amount"
            type="number"
            value={depositInfo.amount}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
}

export default DepositComponent;

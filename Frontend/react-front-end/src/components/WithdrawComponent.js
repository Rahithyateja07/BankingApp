import React, { useState } from 'react';
import { withdraw } from '../services/AccountService';
import './FormStyles.css';

function WithdrawComponent() {
  const [withdrawalInfo, setWithdrawalInfo] = useState({
    accountNo: '',
    IFSC: '',
    amount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdrawalInfo({ ...withdrawalInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await withdraw(withdrawalInfo.accountNo, withdrawalInfo.IFSC, withdrawalInfo.amount);
      alert('Withdrawal successful');
    } catch (error) {
      alert('Failed to withdraw');
      console.error('Withdrawal error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Withdraw</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Account Number:</label>
          <input
            name="accountNo"
            type="text"
            value={withdrawalInfo.accountNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>IFSC Code:</label>
          <input
            name="IFSC"
            type="text"
            value={withdrawalInfo.IFSC}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            name="amount"
            type="number"
            value={withdrawalInfo.amount}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Withdraw</button>
      </form>
    </div>
  );
}

export default WithdrawComponent;

import React, { useState } from 'react';
import { getBalance } from '../services/AccountService';
import './FormStyles.css';
function BalanceEnquiryComponent() {
  const [accountNo, setAccountNo] = useState('');
  const [balance, setBalance] = useState(null);

  const handleChange = (e) => {
    setAccountNo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getBalance(accountNo);
      setBalance(response.data);
      alert(`Balance: ${response.data}`);
    } catch (error) {
      alert('Failed to retrieve balance');
      console.error('Balance enquiry error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Balance Enquiry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Account Number:</label>
          <input
            type="text"
            value={accountNo}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Check Balance</button>
      </form>
      {balance !== null && <p>Balance: {balance}</p>}
    </div>
  );
}

export default BalanceEnquiryComponent;

import React, { useState } from 'react';
import { chequeDeposit } from '../services/AccountService';
import './FormStyles.css';
function ChequeDepositComponent() {
    const [chequeInfo, setChequeInfo] = useState({
      fromAccountNo: '',
      fromIFSC: '',
      toAccountNo: '',
      toIFSC: '',
      amount: 0,
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setChequeInfo({ ...chequeInfo, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await chequeDeposit(chequeInfo.fromAccountNo, chequeInfo.fromIFSC, chequeInfo.toAccountNo, chequeInfo.toIFSC, chequeInfo.amount);
        alert('Cheque deposit successful');
      } catch (error) {
        alert('Failed to deposit cheque');
        console.error('Cheque deposit error:', error);
      }
    };
  
    return (
      <div className="container">
        <h2>Cheque Deposit</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>From Account Number:</label>
            <input
              name="fromAccountNo"
              type="text"
              value={chequeInfo.fromAccountNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>From IFSC:</label>
            <input
              name="fromIFSC"
              type="text"
              value={chequeInfo.fromIFSC}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>To Account Number:</label>
            <input
              name="toAccountNo"
              type="text"
              value={chequeInfo.toAccountNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>To IFSC:</label>
            <input
              name="toIFSC"
              type="text"
              value={chequeInfo.toIFSC}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              name="amount"
              type="number"
              value={chequeInfo.amount}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Deposit Cheque</button>
        </form>
      </div>
    );
  }
  

export default ChequeDepositComponent;

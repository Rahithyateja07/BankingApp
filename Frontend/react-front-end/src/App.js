import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import DepositComponent from './components/DepositComponent';
import WithdrawComponent from './components/WithdrawComponent';
import ChequeDepositComponent from './components/ChequeDepositComponent';
import BalanceEnquiryComponent from './components/BalanceEnquiryComponent';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className='navbar'>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/deposit">Deposit</Link></li>
            <li><Link to="/withdraw">Withdraw</Link></li>
            <li><Link to="/chequeDeposit">Cheque Deposit</Link></li>
            <li><Link to="/balanceEnquiry">Balance Enquiry</Link></li>
          </ul>
        </nav>
        <div className="content">
        <Routes>
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/deposit" element={<DepositComponent />} />
          <Route path="/withdraw" element={<WithdrawComponent />} />
          <Route path="/chequeDeposit" element={<ChequeDepositComponent />} />
          <Route path="/balanceEnquiry" element={<BalanceEnquiryComponent />} />
        </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;

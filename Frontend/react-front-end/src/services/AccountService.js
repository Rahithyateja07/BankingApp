import axios from 'axios';

const BASE_URL = 'http://localhost:9797/api/accounts';

const registerAccount = async (account) => {
  return axios.post(`${BASE_URL}/register`, account);
};

const deposit = async (accountNo, IFSC, amount) => {
  return axios.post(`${BASE_URL}/deposit`, null, { params: { accountNo, IFSC, amount } });
};

const withdraw = async (accountNo, IFSC, amount) => {
  return axios.post(`${BASE_URL}/withdraw`, null, { params: { accountNo, IFSC, amount } });
};

const chequeDeposit = async (fromAccountNo, fromIFSC, toAccountNo, toIFSC, amount) => {
  return axios.post(`${BASE_URL}/chequeDeposit`, null, { params: { fromAccountNo, fromIFSC, toAccountNo, toIFSC, amount } });
};

const getBalance = async (accountNo) => {
  return axios.get(`${BASE_URL}/balance/${accountNo}`);
};

export { registerAccount, deposit, withdraw, chequeDeposit, getBalance };

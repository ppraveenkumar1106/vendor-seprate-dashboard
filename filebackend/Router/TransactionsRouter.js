import express from 'express';

import { getTransaction,
       getTransactionById,
       createTransaction,
       updateTransaction,
       deleteTransaction, }
  from '../Controller/TransactionsController.js';

  const router = express.Router();

  router.get('/Transactions', getTransaction);
  router.get('/Transactions/:id', getTransactionById);
  router.post('/Transactions', createTransaction);
  router.put('/Transactions/:id', updateTransaction);
  router.delete('/Transactions/:id', deleteTransaction);

  export default router;
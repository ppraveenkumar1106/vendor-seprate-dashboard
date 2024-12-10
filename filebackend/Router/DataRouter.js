// import express from 'express';
// import { 
//     getOnlyCards, 
//     getOnlyCardById, 
//     createOnlyCard, 
//     updateOnlyCard, 
//     deleteOnlyCard 
// } from '../Controller/OnlyCardsController.js';

// import { 
//     getOverview, 
//     getOverviewById, 
//     createOverview, 
//     updateOverview, 
//     deleteOverview 
// } from '../Controller/OverviewController.js';

// import { getCard,
//     getcardById,
//     creaeCard,
//     updateCard,
//     deleteCard } from '../Controller/CardController.js';
    
// import {
//     getProducts,
//     getProductById,
//     createProduct,
//     updateProduct,
//     deleteProduct,}
//     from '../Controller/ProductsController.js';

//    import { getTransaction,
//         getTransactionById,
//         createTransaction,
//         updateTransaction,
//         deleteTransaction, }
//      from '../Controller/TransactionsController.js';



// const router = express.Router();

// // Routes for OnlyCards
// router.get('/onlycards', getOnlyCards);
// router.get('/onlycards/:id', getOnlyCardById);
// router.post('/onlycards', createOnlyCard);
// router.put('/onlycards/:id', updateOnlyCard);
// router.delete('/onlycards/:id', deleteOnlyCard);

// // Routes for Overview (with a distinct prefix)
// router.get('/overview', getOverview);
// router.get('/overview/:id', getOverviewById);
// router.post('/overview', createOverview);  // POST route does not need :id
// router.put('/overview/:id', updateOverview);
// router.delete('/overview/:id', deleteOverview);

// router.get('/', getCard);
// router.get('/:id', getcardById);
// router.post('/', creaeCard);
// router.put('/:id', updateCard);
// router.delete('/:id',deleteCard );


// router.get('/', getProducts);
// router.get('/:id', getProductById);
// router.post('/', createProduct);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);



// router.get('/', getTransaction);
// router.get('/:id', getTransactionById);
// router.post('/', createTransaction);
// router.put('/:id', updateTransaction);
// router.delete('/:id', deleteTransaction);


// export default router;



// import express from 'express';
// import CardRouter from './CardRouter.js';
// import OnlyCardsRouter from './OnlyCardsRouter.js';
// import OverviewRouter from './OverviewRouter.js';
// import ProductsRouter from './ProductsRouter.js';
// import TransactionsRouter from './TransactionsRouter.js';

// const router = express.Router();

// // Mount each router on its respective route
// router.use('/cards', CardRouter);
// router.use('/onlycards', OnlyCardsRouter);
// router.use('/overview', OverviewRouter);
// router.use('/products', ProductsRouter);
// router.use('/transactions', TransactionsRouter);

// export default router;

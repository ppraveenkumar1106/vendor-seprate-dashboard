import express from 'express';

import {
  getAllOverviews,
  getOverviewById,
  createOverview,
  updateOverview,
  deleteOverview
} from '../Controller/OverviewController.js';

const router = express.Router();

router.get('/overview', getAllOverviews);
router.get('/overview/:id', getOverviewById);
router.post('/overview', createOverview);
router.put('/overview/:id', updateOverview);
router.delete('/overview/:id', deleteOverview);

export default router;

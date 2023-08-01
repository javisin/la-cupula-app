import asyncHandler from 'express-async-handler';
import Plan from '../database/models/plan';

const index = asyncHandler(async (req, res) => {
  const plans = await Plan.findAll();
  res.status(200).json({ data: plans });
});

export { index };

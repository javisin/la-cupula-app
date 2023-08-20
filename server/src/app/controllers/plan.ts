import asyncHandler from 'express-async-handler';
import PostgresPlanRepository from '../../Context/Plans/infraestructure/PostgresPlanRepository';
import PlansGetter from '../../Context/Plans/application/PlansGetter';

const index = asyncHandler(async (req, res) => {
  const planRepository = new PostgresPlanRepository();
  const planGetter = new PlansGetter(planRepository);
  const plans = await planGetter.run();
  res.status(200).json(plans);
});

export { index };

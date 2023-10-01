import asyncHandler from 'express-async-handler';
import { PlanModel } from '../../Context/Plans/infraestructure/PlanModel';
import { SequelizeUser } from '../../Context/Users/infraestructure/UserModel';

const index = asyncHandler(async (req, res) => {
  const users = await SequelizeUser.findAll({
    attributes: [
      'id',
      'firstName',
      'lastName',
      'belt',
      'stripes',
      'nickName',
      'image',
      'startDate',
    ],
    include: [{ model: PlanModel, as: 'plan' }],
    order: [['nickName', 'ASC']],
  });
  res.status(200).json(users);
});

const get = asyncHandler(async (req, res) => {
  const user = await SequelizeUser.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: PlanModel, as: 'plan' }],
  });
  if (user === null) {
    res.status(404).json({ message: 'This user does not exist' });
    return;
  }
  res.status(200).json(user);
});

interface UserUpdateBody {
  planId?: string | null;
}

const update = asyncHandler(async (req, res) => {
  const user = await SequelizeUser.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (user === null) {
    res.status(404).json({ message: 'This user does not exist' });
    return;
  }
  const { planId } = req.body as UserUpdateBody;
  if (planId !== undefined) {
    user.planId = planId;
  }
  await user.save();
  res.status(200).json(user);
});

export { index, get, update };

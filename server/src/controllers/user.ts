import asyncHandler from 'express-async-handler';
import User from '../database/models/user';
import Plan from '../database/models/plan';

const index = asyncHandler(async (req, res) => {
  const users = await User.findAll({
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
    include: [{ model: Plan, as: 'plan' }],
  });
  res.status(200).json({ data: users });
});

const get = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (user === null) {
    res.status(404).json({ message: 'This user does not exist' });
    return;
  }
  res.status(200).json(user);
});

interface UserUpdateBody {
  planId?: number | null;
}

const update = asyncHandler(async (req, res) => {
  const user = await User.findOne({
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

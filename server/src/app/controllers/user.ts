import asyncHandler from 'express-async-handler';
import { PlanModel } from '../../Context/Plans/infraestructure/PlanModel';
import { SequelizeUser } from '../../Context/Users/infraestructure/UserModel';
import { BookingModel } from '../../Context/Bookings/infraestructure/BookingModel';

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
      'planBookings',
    ],
    include: [{ model: PlanModel, as: 'plan' }],
    order: [
      ['nickName', 'ASC'],
      ['firstName', 'ASC'],
    ],
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
  const totalBookings = await BookingModel.count({
    where: {
      userId: req.params.id,
    },
  });
  if (user === null) {
    res.status(404).json({ message: 'This user does not exist' });
    return;
  }
  res.status(200).json({ ...user.dataValues, totalBookings });
});

interface UserUpdateBody {
  planId?: string | null;
  paidAt?: string | null;
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
  const { planId, paidAt } = req.body as UserUpdateBody;
  if (planId !== undefined) {
    user.planId = planId;
  }
  if (paidAt !== undefined) {
    user.paidAt = paidAt ? new Date(paidAt) : null;
  }
  await user.save();
  res.status(200).json(user);
});

export { index, get, update };

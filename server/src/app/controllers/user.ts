import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';
import { PlanModel } from '../../Context/Plans/infraestructure/PlanModel';
import { SequelizeUser } from '../../Context/Users/infraestructure/UserModel';
import { BookingModel } from '../../Context/Bookings/infraestructure/BookingModel';

interface IndexQueryParams {
  hasPlan?: boolean;
  instructor?: boolean;
}
const index = asyncHandler(async (req, res) => {
  const filter = req.query satisfies IndexQueryParams;
  const whereStatement: { planId?: any; instructor?: boolean; deleted?: boolean } = {
    deleted: false,
  };
  if (filter?.hasPlan) {
    whereStatement.planId = {
      [Op.not]: null,
    };
  }
  if (filter?.instructor !== undefined) {
    whereStatement.instructor = filter.instructor === 'true';
  }
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
    where: whereStatement,
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
    user.planBookings = 0;
  }
  if (paidAt !== undefined) {
    user.paidAt = paidAt ? new Date(paidAt) : null;
  }
  await user.save();
  res.status(200).json(user);
});

export { index, get, update };

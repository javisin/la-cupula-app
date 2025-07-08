import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';
import fileUpload from 'express-fileupload';
import { PlanModel } from '../../Context/Plans/infraestructure/PlanModel';
import { SequelizeUser } from '../../Context/Users/infraestructure/UserModel';
import { BookingModel } from '../../Context/Bookings/infraestructure/BookingModel';
import { AuthorizedRequest } from '../jwt';
import { uploadFile } from '../../Context/Shared/aws';
import { extractFileExtension } from '../../Context/Shared/application/util/strings';

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
  belt?: string;
}

const update = asyncHandler(async (req: AuthorizedRequest, res) => {
  const user = await SequelizeUser.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (user === null) {
    res.status(404).json({ message: 'This user does not exist' });
    return;
  }
  const { planId, paidAt, belt } = req.body as UserUpdateBody;
  if (planId !== undefined) {
    user.planId = planId;
    user.planBookings = 0;
  }
  if (paidAt !== undefined) {
    user.paidAt = paidAt ? new Date(paidAt) : null;
  }
  if (belt !== undefined) {
    if (!req.user?.instructor) {
      res.status(403).json({ message: 'Only instructors can update belts' });
      return;
    }
    user.belt = belt;
  }
  await user.save();
  res.status(200).json(user);
});

const updateImage = asyncHandler(async (req: AuthorizedRequest, res) => {
  const user = await SequelizeUser.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (user === null) {
    res.status(404).json({ message: 'This user does not exist' });
    return;
  }
  if (req.user?.sub !== user.id.toString() && !req.user?.instructor) {
    res.status(403).json({ message: 'Only instructors or the user can update the image' });
    return;
  }

  const imageFile = req.files?.image as fileUpload.UploadedFile | undefined;
  if (imageFile === undefined) {
    res.status(400).json({ message: 'Image file is required' });
    return;
  }
  const fileExtension = extractFileExtension(imageFile.name) ?? '';
  const uploadFileName = user.email.toLowerCase() + fileExtension;
  await uploadFile(imageFile.data, uploadFileName);
  user.image = `https://lacupula.s3.eu-west-2.amazonaws.com/${uploadFileName}`;
  await user.save();
  res.status(200).json(user);
});

export { index, get, update, updateImage };

import asyncHandler from 'express-async-handler';
import PostgresAcademyRepository from '../../Context/Academies/infraestructure/PostgresAcademyRepository';

const getAcademies = asyncHandler(async (req, res) => {
  const academyRepository = new PostgresAcademyRepository();
  const academies = await academyRepository.get();
  res.status(200).json(academies);
});

export { getAcademies };

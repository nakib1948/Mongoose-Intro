import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;
  const isAcademicSemesterExits =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found',
    );
  }

  const isSemesterRegistrationsExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationsExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This semester is already registered!',
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationIntoDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  ).filter().sort().paginate().fields()
  const result = await semesterRegistrationQuery.modelQuery
  return result
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationIntoDB
};

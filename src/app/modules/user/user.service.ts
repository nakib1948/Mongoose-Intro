import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  userData.role = 'student';
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);
    //transaction-1
    const newUser = await User.create([userData], {session});
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Falied to create a user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newStudent = await Student.create([payload],{session});

    if(!newStudent){
      throw new AppError(httpStatus.BAD_REQUEST, 'Falied to create a user');
    }
    await session.commitTransaction()
    await session.endSession()
    return newStudent;
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
};

export const UserServices = {
  createStudentIntoDB,
};

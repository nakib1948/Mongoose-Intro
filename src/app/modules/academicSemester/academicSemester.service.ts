import catchAsync from '../../utils/catchAsync';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemesterCode } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (payload: TAcademicSemesterCode) => {


  if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
     throw new Error ('Invalid Semster Code')
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemester,
};

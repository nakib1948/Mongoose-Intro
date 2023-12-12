import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('admissionSemester')
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.find({ id });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};

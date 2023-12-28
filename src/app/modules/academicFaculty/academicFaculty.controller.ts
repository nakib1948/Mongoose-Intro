
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';



const createAcademicFaculty= catchAsync(async (req, res, next) => {
  

  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created succesfully',
    data: result,
  });
});
const getAllFaculties = catchAsync(async (req, res) => {
  //console.log(req.cookies);

  const result = await AcademicFacultyServices.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrieved succesfully',
    data: result,
  });
});
export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllFaculties

};

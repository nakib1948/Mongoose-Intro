
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';



const createAcademicDepartment= catchAsync(async (req, res, next) => {
  

  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is created succesfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
    createAcademicDepartment

};

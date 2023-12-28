import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { SemesterRegistrationService } from "./semesterRegistration.service";


const createSemesterRegistration = catchAsync(
    async (req: Request, res: Response) => {
      const result =
        await SemesterRegistrationService.createSemesterRegistrationIntoDB(
          req.body,
        );
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is created successfully!',
        data: result,
      });
    },
  );

  const getAllSemesterRegistration = catchAsync(
    async (req: Request, res: Response) => {
      const result =
        await SemesterRegistrationService.getAllSemesterRegistrationIntoDB(
          req.query,
        );
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is retrived successfully!',
        data: result,
      });
    },
  );

  export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration
  };
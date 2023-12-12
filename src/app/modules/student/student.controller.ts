import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi'
import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {

    const { student: studentData } = req.body;
    const {error,value} = studentValidationSchema.validate(studentData)
    
    if(error){
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error:error.details
      });
    }

    const result = await StudentServices.createStudentIntoDB(value);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error:err
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err)
  }
};

export const StudentControllers = {
 
  getAllStudents,
  getSingleStudent,
};

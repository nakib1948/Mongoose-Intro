import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();


router.post(
  '/create-student', auth(USER_ROLE.admin),
  validateRequest(studentValidations.studentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;

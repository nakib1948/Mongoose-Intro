import express from "express"
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";

const router = express.Router();

router.post('/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty)



export const AcademicFacultyRoutes = router
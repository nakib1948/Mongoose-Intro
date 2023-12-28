import express from "express"
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post('/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty)


  router.get(
    '/',
    auth(),
    AcademicFacultyControllers.getAllFaculties,
  );
export const AcademicFacultyRoutes = router
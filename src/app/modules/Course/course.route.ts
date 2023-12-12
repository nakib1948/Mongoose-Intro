import express from "express"
import { CourseValidations } from "./course.validation";
import { courseControllers } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";


const router = express.Router();

router.post('/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  courseControllers.createCourse)
router.get('/:id',CourseControllers.getSingleCourses)
router.get('/',courseControllers.getAllCourses)


export const CourseRoutes = router
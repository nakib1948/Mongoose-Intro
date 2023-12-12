import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";



const createCourse = catchAsync(async(req,res)=>{
    const result = await CourseServices.createCourseIntoDB(req.body)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"course is created successfully",
        data:result
    })
})

const getAllCourses = catchAsync(async(req,res)=>{
    const result = await CourseServices.getAllCoursesFromDB()

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Course are retrived successfully",
        data:result
    })
})

const getSingleCourses = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await CourseServices.getSingleCoursesFromDB(id)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Course is retrived successfully",
        data:result
    })
})

const deleteCourses = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await CourseServices.deleteCoursesFromDB(id)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Course is deleted successfully",
        data:result
    })
})

export const courseControllers = {
    createCourse,
    getSingleCourses,
    getAllCourses,
    deleteCourses
}
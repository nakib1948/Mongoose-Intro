import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";



const loginUser = catchAsync(async(req,res)=>{
    const result = await AuthServices.loginUser(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'User is logged in successfully',
        data:result
    })
})
const changePassword = catchAsync(async(req,res)=>{

    const {...passwordData} = req.body
    const result = await AuthServices.changePassword(req.user,passwordData)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'User is logged in successfully',
        data:result
    })
})

const forgetPassword = catchAsync(async(req,res)=>{
    const userId = req.body.id
    const result = await AuthServices.forgetPassword(userId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Reset Link is generated successfully',
        data:result
    })
})
const resetPassword = catchAsync(async(req,res)=>{
    const token = req.headers.authorization
    const result = await AuthServices.resetPassword(req.body,token)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'password reset successful',
        data:result
    })
})

export const AuthContollers = {
    loginUser,
    changePassword,
    forgetPassword,
    resetPassword
}
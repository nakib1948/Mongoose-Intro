/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import { handleZodError } from '../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode =err.statusCode || 500;
  let message = err.message || 'Something went wrong!';


  let errorSources: TErrorSource = [
    {
      path:'',
      message:"Something went wrong"
    }
  ]
  
  if(err instanceof ZodError){
     const simplifiedError = handleZodError(err)
     statusCode = simplifiedError.statusCode;
     message = simplifiedError.message;
     errorSources = simplifiedError.errorSources
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack:null
  });
};

export default globalErrorHandler;
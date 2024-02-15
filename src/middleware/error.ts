import { Request, Response, NextFunction } from "express";
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

interface CustomError extends Error {
    statusCode: number;
}

export const errorConverter = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let error: any = err;
    if (!(error instanceof ApiError)) {
        const statusCode = error?.statusCode || 500;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    if (error?.message == 'jwt expired') {
        const statusCode = 401;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let error: any = err
    res.locals.errorMessage = err.message;

    const response = {
        code: error?.statusCode || 500,
        message: error?.message,
        stack: err.stack,
    };
    res.status(error?.statusCode || 500).send(response);
};
import jwt from 'jsonwebtoken';
import httpStatus from "http-status";
import { Request, Response, NextFunction } from 'express';
import config from "../config/config";
import ApiError from "../utils/ApiError";
import { catchAsync } from '../utils/catchAsync';

export const authenicate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (token) {
        const authenticationScheme = 'Bearer ';
        if (token.startsWith(authenticationScheme)) {
            token = token.slice(authenticationScheme.length, token.length);
        }
        const decode = jwt.verify(token, config.jwt.secret);
        next()
    } else {
        throw new ApiError(httpStatus.FORBIDDEN, 'token not found')
    }
});
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';
import ApiError from '../utils/ApiError';

const addressSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required()
});

export const userCreateValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        firstName: Joi.string().min(3).max(12).required(),
        lastName: Joi.string().min(3).max(12).required(),
        gender: Joi.string().min(3).max(12).required(),
        phoneNo: Joi.string().min(3).max(12).required(),
        email: Joi.string().email().min(6).max(30).required(),
        password: Joi.string().min(8).max(10).required(),
        dob: Joi.string().max(80).required(),
        address: Joi.array().items(addressSchema).required()
    });

    const validData = schema.validate(req.body)

    if (validData.error) {
        throw new ApiError(httpStatus.BAD_REQUEST, validData.error.details[0].message)
    }
    next()
}

export const userLogin = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().min(6).max(30).required(),
        password: Joi.string().min(8).max(10).required()
    });

    const validData = schema.validate(req.body)

    if (validData.error) {
        throw new ApiError(httpStatus.BAD_REQUEST, validData.error.details[0].message)
    }
    next()
}

export const userLogout = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        id: Joi.number().required(),
        token: Joi.string().required()
    });

    const validData = schema.validate(req.body)

    if (validData.error) {
        throw new ApiError(httpStatus.BAD_REQUEST, validData.error.details[0].message)
    }
    next()
}


export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        id: Joi.number().required(),
        token: Joi.string().required()
    });

    const validData = schema.validate(req.body)

    if (validData.error) {
        throw new ApiError(httpStatus.BAD_REQUEST, validData.error.details[0].message)
    }
    next()
}

export const userUpdateValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        id: Joi.number().required(),
        firstName: Joi.string().min(3).max(12),
        lastName: Joi.string().min(3).max(12),
        gender: Joi.string().min(3).max(12),
        phoneNo: Joi.string().min(3).max(12),
        email: Joi.string().email().min(6).max(30),
        // password: Joi.string().min(8).max(10),
        dob: Joi.string().max(80),
        address: Joi.array().items(addressSchema)
    });

    const validData = schema.validate(req.body)

    if (validData.error) {
        throw new ApiError(httpStatus.BAD_REQUEST, validData.error.details[0].message)
    }
    next()
}

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object().keys({
        id: Joi.number().required()
    });

    const validData = schema.validate(req.body)

    if (validData.error) {
        throw new ApiError(httpStatus.BAD_REQUEST, validData.error.details[0].message)
    }
    next()
}
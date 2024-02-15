import { catchAsync } from "../utils/catchAsync";
import httpStatus from 'http-status'
import tokenService from '../services/token.service';
import { User } from "../entity";
import { AppDataSource } from '../config/app-data-source';
const userRepository = AppDataSource.getRepository(User);

const createUser = catchAsync(async (req, res) => {
    const info = req.body;
    const newuser = userRepository.create(info);
    let data = await userRepository.save(newuser);
    res.status(httpStatus.CREATED).json({
        status: true,
        data: data
    })
});

const logout = catchAsync(async (req, res) => {
    const {id, token} = req.body;
    let data = await userRepository.findOne({ where: { id, refreshToken:token } })
    if(!data) {
        res.json({
            status: false,
            message: 'User not found'
        })
    }
    await userRepository.update({ id },
        { refreshToken : '', isLogin: false });
    res.json({
        status: true,
        message: 'User logout successfully'
    })
});


const getUsers = catchAsync(async (req, res) => {
    const data = await userRepository.find({})
    res.json({
        status: true,
        data: data
    })
})

const updateUsers = catchAsync(async (req, res) => {
    let info = req.body;
    let { id } = info;
    delete info.id;
    await userRepository.update({ id },
        { ...info })
    let data = await userRepository.findOne({ where: { id } })
    res.json({
        status: true,
        data: data
    })
})

const deleteUser = catchAsync(async (req, res) => {
    let id = req.body.id;
    let result = await userRepository.delete(id);
    res.json({
        status: true,
        message: 'user data deleted successfully'
    })
})

const login = catchAsync(async (req, res) => {
    const info = req.body;
    const user: any = await userRepository.findOne({
        where: { email: info.email }
    })
    if (user && await user.comparePassword(info.password)) {
        const tokens = await tokenService.generateAuthTokens(user);
        res.json({
            ...tokens,
            user,
            status: true,
            message: 'Login success'
        })
    }
    res.status(httpStatus.UNAUTHORIZED).json({
        status: false,
        message: 'Invalid Email/Password'
    })
})

const generateRefreshToken = catchAsync(async (req, res) => {
    const info: any = req.body;
    const user: any = await userRepository.findOneBy({ id: info.id, refreshToken: info.token })
    if (user) {
        const tokens = await tokenService.generateRefreshTokens(user);
        res.json({
            ...tokens,
            status: true,
            message: 'Token generate successfully'
        })
    }
    res.status(httpStatus.UNAUTHORIZED).json({
        status: false,
        message: 'Invalid Token'
    })
})

export = {
    createUser,
    getUsers,
    updateUsers,
    deleteUser,
    login,
    generateRefreshToken,
    logout
};
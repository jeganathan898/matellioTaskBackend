import jwt from 'jsonwebtoken';
import moment from 'moment';
import httpStatus from 'http-status';
import config from '../config/config';
import { User } from "../entity";
import { AppDataSource } from '../config/app-data-source';
const userRepository = AppDataSource.getRepository(User);

const generateToken = (userId: string, expires: any, type: string, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token: string, userId: any) => {
  await userRepository.update({ id: userId }, { refreshToken: token, isLogin: true })
};

const verifyToken = async (token: string, userId: any) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await userRepository.findOne({ where: { id: userId, refreshToken: token } });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

const generateAuthTokens = async (user: any) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, 'accessToken');

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, 'refreshToken');
  await saveToken(refreshToken, user.id);
  return {
    access: accessToken,
    refresh: refreshToken,
  };
};

const generateRefreshTokens = async (user: any) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, 'accessToken');
  return {
    access: accessToken
  };
};

export = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateRefreshTokens
};

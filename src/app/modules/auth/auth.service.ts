import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser } from './auth.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { createToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmail';

const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await User.isUserExistsByCustomId(payload.id);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }
  const userStatus = isUserExists?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExists?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'password donot matched!');
  }
  const jwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: isUserExists?.needsPasswordChange,
  };
};

const changePassword = async (user: JwtPayload, payload) => {
  const result = await User.findOneAndUpdate({
    id: user.userId,
    role: user.role,
  });
};
const forgetPassword = async (id: string) => {
  const isUserExists = await User.isUserExistsByCustomId(id);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }
  const userStatus = isUserExists?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
  const jwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '30m',
  );
  const resetUILink = `http://localhost:3000?id=${isUserExists.id}&token=${resetToken}`;
  sendEmail(isUserExists.email, resetUILink);
};
const resetPassword = async (
  payload: { id: string; newPassword: string },
  token:string,
) => {
  const isUserExists = await User.isUserExistsByCustomId(payload.id);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }
  const userStatus = isUserExists?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload
  if(payload.id !== decoded.userId){
    throw new AppError(httpStatus.FORBIDDEN,"You are forbidden!")
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  )
  await User.findOneAndUpdate({
    id:decoded.userId,
    role:decoded.role
  },{
    password: newHashedPassword,
    needsPasswordChange:false
  })
};

export const AuthServices = {
  loginUser,
  changePassword,
  forgetPassword,
  resetPassword
};

import { User } from '../generated/prisma/index.js';
import { userService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsync from '../utils/catchAsync.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import exclude from '../utils/exclude.ts';
import pick from '../utils/pick.ts';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
    const { email, password, name, role } = req.body;
    const user = await userService.createUser(email, password, name, role);
    const userWithoutPassword = exclude(user, ['password']);
    res.status(httpStatus.CREATED).send(userWithoutPassword);
});

const getUsers = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.validatedQuery, ['name', 'role']);
    const options = pick(req.validatedQuery, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
});

const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(parseInt(req.params.userId));
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const userWithoutPassword = exclude(user, ['password']);
    res.send(userWithoutPassword);
});

const updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUserById(parseInt(req.params.userId), req.body);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const userWithoutPassword = exclude(user, ['password']);
    res.send(userWithoutPassword);
});

const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUserById(parseInt(req.params.userId));
    res.send({});
});

const getProfile = catchAsyncWithAuth(async (req, res) => {
    const user = req.user as User;
    const userProfile = await userService.getUserById(user.id);
    if (!userProfile) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const userWithoutPassword = exclude(userProfile, ['password']);
    res.send(userWithoutPassword);
});

const updateProfile = catchAsyncWithAuth(async (req, res) => {
    const user = req.user as User;
    const updatedUser = await userService.updateUserById(user.id, req.body);
    if (!updatedUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const userWithoutPassword = exclude(updatedUser, ['password']);
    res.send(userWithoutPassword);
});

const changePassword = catchAsyncWithAuth(async (req, res) => {
    const user = req.user as User;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    if (newPassword !== confirmPassword) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'New password and confirm password do not match');
    }
    
    await userService.changeUserPassword(user.id, currentPassword, newPassword);
    res.send({});
});

export default {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getProfile,
    updateProfile,
    changePassword
};

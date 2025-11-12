import { Role } from '../generated/prisma/index.js';
import { password } from './custom.validation.ts';
import Joi from 'joi';

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
        role: Joi.string().required().valid(Role.USER, Role.ADMIN)
    })
};

const getUsers = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};

const getUser = {
    params: Joi.object().keys({
        userId: Joi.number().integer()
    })
};

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.number().integer()
    }),
    body: Joi.object()
        .keys({
            email: Joi.string().email(),
            password: Joi.string().custom(password),
            name: Joi.string()
        })
        .min(1)
};

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.number().integer()
    })
};

const updateProfile = {
    body: Joi.object()
        .keys({
            name: Joi.string(),
            email: Joi.string().email()
        })
        .min(1)
};

const changePassword = {
    body: Joi.object().keys({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().required().custom(password),
        confirmPassword: Joi.string().required().custom(password)
    })
};

export default {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    updateProfile,
    changePassword
};

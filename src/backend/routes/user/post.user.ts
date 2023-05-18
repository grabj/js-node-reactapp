import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { v4 } from 'uuid'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { createHash } from '../../utils/hash.utils'
import { authorize } from '../../utils/middleware.utils'

const SALT = (process.env.PASSWORD_SALT as string) ?? 'XYZ'
export default {
    method: 'post',
    path: '/api/user',
    validators: [
        authorize,
        body('email').isEmail(),
        body('password').not().isEmpty(),
        body('login').not().isEmpty(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            messages: { uniqueConstraintFailed: 'Login must be unique.' },
            execute: async () => {
                const { email, login, password, imie } = req.body
                const passwordHash = createHash(password, SALT)
                return prisma.user.create({
                    data: {
                        id: v4(),
                        email,
                        login,
                        imie,
                        password: passwordHash,
                    },
                })
            },
        }),
} as TRoute

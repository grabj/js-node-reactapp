import { Request, Response } from 'express'
import { body, sanitizeBody } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { createHash } from '../../utils/hash.utils'

const SALT = (process.env.PASSWORD_SALT as string) ?? 'XYZ'
export default {
    method: 'post',
    path: '/api/user',
    validators: [
        body('email').isEmail(),
        body('haslo').not().isEmpty(),
        body('login').not().isEmpty(),
        body('imie').not().isEmpty(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
            messages: { uniqueConstraintFailed: 'Email must be unique.' },
            execute: async () => {
                const { email, login, haslo, imie } = req.body
                const passwordHash = createHash(haslo, SALT)
                return prisma.uSER.create({
                    data: {
                        email,
                        login,
                        haslo: passwordHash,
                        imie,
                    },
                })
            },
        }),
} as TRoute

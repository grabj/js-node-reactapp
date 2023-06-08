import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest, TCustomError } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import jwt from 'jsonwebtoken'

export default {
    method: 'delete',
    path: '/api/deleteuser',
    validators: [authorize],
    handler: async (req: Request, res: Response) => {
        return handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.NO_CONTENT,
            messages: { uniqueConstraintFailed: 'Email must be unique.' },
            execute: async () => {
                const token = req.headers.authorization?.replace('Bearer ', '')
                const payload: any = jwt.decode(token ?? '')
                try {
                    await prisma.uSER.delete({
                        where: { id_usera: payload?.id_usera ?? 0 },
                    })
                } catch (e) {
                    throw {
                        status: StatusCodes.NOT_FOUND,
                        message: ReasonPhrases.NOT_FOUND,
                        isCustomError: true,
                    } as TCustomError
                }

                return { string: 'User deleted' }
            },
        })
    },
} as TRoute

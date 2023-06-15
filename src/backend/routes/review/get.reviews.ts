import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

export default {
    method: 'get',
    path: '/api/reviews',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
            execute: async () => {
                return await prisma.rECENZJE.findMany()
            },
        }),
} as TRoute

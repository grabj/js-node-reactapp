import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

export default {
    method: 'put',
    path: '/api/edit-review',
    validators: [
        authorize,
        body('id_recenzji').not().isEmpty(),
        body('recenzja').not().isEmpty(),
        body('ocena_ogolna').not().isEmpty(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
            execute: async () => {
                const { id_recenzji, recenzja, ocena_ogolna } = req.body
                return await prisma.rECENZJE.update({
                    where: { id_recenzji: Number(id_recenzji) },
                    data: { recenzja: recenzja, ocena_ogolna: ocena_ogolna },
                })
            },
        }),
} as TRoute

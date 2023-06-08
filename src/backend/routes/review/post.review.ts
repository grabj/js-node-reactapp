import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

export default {
    method: 'post',
    path: '/api/add-review',
    validators: [
        authorize,
        body('recenzja').not().isEmpty(),
        body('ocena_ogolna').not().isEmpty(),
        body('id_produktu').not().isEmpty(),
        body('id_usera').not().isEmpty(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
            execute: async () => {
                const { recenzja, ocena_ogolna, id_produktu, id_usera } =
                    req.body
                return await prisma.rECENZJE.create({
                    data: {
                        recenzja,
                        ocena_ogolna,
                        id_produktu,
                        id_usera,
                    },
                })
            },
        }),
} as TRoute

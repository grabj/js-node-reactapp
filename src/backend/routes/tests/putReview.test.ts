import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../../utils/jwt.utils'
import editReviewHandler from '../review/put.review'

jest.mock('../../database', () => ({
    prisma: {
        rECENZJE: {
            update: jest.fn(),
        },
    },
}))

describe('editReviewHandler', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    const secret = 'mysecret'
    const payload = { userId: 123 }

    beforeEach(() => {
        req = {
            body: {
                id_recenzji: 1000,
                recenzja: 'Zaktualizowana recenzja',
                ocena_ogolna: 4,
            },
        }
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('zwraca 200 status code i aktualizuje recenzję', async () => {
        const updateMock = prisma.rECENZJE.update as jest.Mock
        const token = jwt.sign(payload, secret)

        const authorisation = verifyToken(token, secret)
        updateMock.mockResolvedValue({ id_recenzji: 1000 })

        await editReviewHandler.handler(<Request>req, <Response>res)

        expect(updateMock).toHaveBeenCalledWith({
            where: { id_recenzji: req.body.id_recenzji },
            data: {
                recenzja: req.body.recenzja,
                ocena_ogolna: req.body.ocena_ogolna,
            },
        })
        expect(authorisation.content).toMatchObject(payload)
        expect(authorisation.status).toEqual(StatusCodes.OK)
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
        expect(res.send).toHaveBeenCalledWith({ data: { id_recenzji: 1000 } })
    })

    it('zwraca 401, jeżeli weryfikacja się nie powiedzie', async () => {
        const token = jwt.sign(payload, secret)
        const invalidToken = token.replace('1', '2')

        const authorisation = verifyToken(invalidToken, secret)

        await editReviewHandler.handler(<Request>req, <Response>res)

        expect(authorisation.content).toMatchObject({})
        expect(authorisation.status).toEqual(StatusCodes.UNAUTHORIZED)
    })
})

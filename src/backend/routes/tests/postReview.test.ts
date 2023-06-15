import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import addReviewHandler from '../review/post.review'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../../utils/jwt.utils'

jest.mock('../../database', () => ({
    prisma: {
        rECENZJE: {
            create: jest.fn(),
        },
    },
}))

describe('addReviewHandler', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    const secret = 'mysecret'
    const payload = { userId: 123 }

    beforeEach(() => {
        req = {
            body: {
                recenzja: 'Recanzja testowa',
                ocena_ogolna: 5,
                id_produktu: 1,
                id_usera: 123,
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

    it('Zwraca 201 status code i tworzy nową recenzję', async () => {
        const createMock = prisma.rECENZJE.create as jest.Mock
        const token = jwt.sign(payload, secret)

        const authorisation = verifyToken(token, secret)
        createMock.mockResolvedValue({ id_recenzji: 1000 })

        await addReviewHandler.handler(<Request>req, <Response>res)

        expect(createMock).toHaveBeenCalledWith({
            data: {
                recenzja: req.body.recenzja,
                ocena_ogolna: req.body.ocena_ogolna,
                id_produktu: req.body.id_produktu,
                id_usera: req.body.id_usera,
            },
        })
        expect(authorisation.content).toMatchObject(payload)
        expect(authorisation.status).toEqual(StatusCodes.OK)
        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED)
        expect(res.send).toHaveBeenCalledWith({ data: { id_recenzji: 1000 } })
    })

    it('Zwaraca 401, jeżeli weryfikacja się nie powiedzie', async () => {
        const token = jwt.sign(payload, secret)
        const invalidToken = token.replace('1', '2')

        const authorisation = verifyToken(invalidToken, secret)

        await addReviewHandler.handler(<Request>req, <Response>res)

        expect(authorisation.content).toMatchObject({})
        expect(authorisation.status).toEqual(StatusCodes.UNAUTHORIZED)
    })
})

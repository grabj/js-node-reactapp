import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import getReviewsHandler from '../review/get.reviews'
import { verifyToken } from '../../utils/jwt.utils'
import jwt from 'jsonwebtoken'

jest.mock('../../database', () => ({
    prisma: {
        rECENZJE: {
            findMany: jest.fn(),
        },
    },
}))

describe('getReviewsHandler', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    const secret = 'mysecret'
    const payload = { userId: 123 }

    beforeEach(() => {
        req = {}
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Zwraca 200 status code, jeżeli zwrócone zostaną prawidłowe dane', async () => {
        const recenzje = {
            data: [
                {
                    id_recenzji: 1,
                    recenzja:
                        'Krem nawilżający Nivea Soft to świetny wybór dla osób o suchej skórze. Łatwo się wchłania i zapewnia długotrwałe nawilżenie.',
                    ocena_ogolna: 3,
                    id_produktu: 2,
                    id_usera: 4,
                },
                {
                    id_recenzji: 2,
                    recenzja:
                        'Krem BB Maybelline Dream Fresh daje naturalny efekt i jednocześnie kryje drobne niedoskonałości skóry. Bardzo wygodny w użyciu i trwały.',
                    ocena_ogolna: 4,
                    id_produktu: 1,
                    id_usera: 6,
                },
            ],
        }
        const findManyMock = prisma.rECENZJE.findMany as jest.Mock
        const token = jwt.sign(payload, secret)

        const authorisation = verifyToken(token, secret)
        findManyMock.mockResolvedValue({ recenzje: recenzje })

        await getReviewsHandler.handler(<Request>req, <Response>res)

        expect(authorisation.content).toMatchObject(payload)
        expect(authorisation.status).toEqual(StatusCodes.OK)
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
        expect(res.send).toHaveBeenCalledWith({ data: { recenzje: recenzje } })
    })

    it('Zwraca 401 status code, jeżeli weryfikacja się nie powiedzie', async () => {
        const token = jwt.sign(payload, secret)
        const invalidToken = token.replace('1', '2')

        const authorisation = verifyToken(invalidToken, secret)

        await getReviewsHandler.handler(<Request>req, <Response>res)

        expect(authorisation.content).toMatchObject({})
        expect(authorisation.status).toEqual(StatusCodes.UNAUTHORIZED)
    })
})

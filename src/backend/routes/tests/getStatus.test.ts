import express, { Request, Response } from 'express'
import getStatusHandler from '../status/get.status'
import { StatusCodes } from 'http-status-codes'

const app = express()
app.get(getStatusHandler.path, async (req: Request, res: Response) => {
    await getStatusHandler.handler(req, res)
})

describe('getStatusHandler', () => {
    it('Zwraca 200 status code i odpowiedź', async () => {
        const req = {} as Request
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response

        await getStatusHandler.handler(req, res)

        expect(res.status(StatusCodes.OK))
        expect(res.send).toHaveBeenCalledWith(`I'm alive!`)
    })
})
